import produce from 'immer';
import { ThunkAction } from 'redux-thunk';
import * as uuid from 'uuid';
import { RootState } from '.';
import datasource from '../../datasource';
import { isValidCountry } from '../../utils';
import { sortedCountries } from '../selectors';

export enum CountriesOrderBy {
  code,
  name,
  capital,
  region,
  callingCode,
}

export enum CountriesOrder {
  ascending,
  descending,
}

const LOAD_INVOKE = 'countries/load.invoke' as const;
const LOAD_SUCCESS = 'countries/load.success' as const;
const LOAD_ERROR = 'countries/load.error' as const;
const ORDER_BY = 'countries/order_by' as const;
const SET_KEYWORD = 'countries/set_keyword' as const;
const REMOVE = 'countries/remove' as const;
const ADD_TOGGLE = 'countries/add.toggle' as const;
const ADD_CONFIRM = 'countries/add.confirm' as const;
const SET_CURSOR = 'countries/set_cursor' as const;

const PAGINATION = 30;

const load = () => ({ type: LOAD_INVOKE });
const loadSuccess = (countries: Country[]) => ({
  type: LOAD_SUCCESS,
  countries,
});
const loadError = (error: Error) => ({ type: LOAD_ERROR, error });
const orderBy = (value: CountriesOrderBy) => ({
  type: ORDER_BY,
  value,
});
const setKeyword = (value: string) => ({
  type: SET_KEYWORD,
  value,
});
const remove = (id: string) => ({
  type: REMOVE,
  id,
});
const addToggle = (): { type: 'countries/add.toggle' } => ({
  type: ADD_TOGGLE,
});
const addConfirm = (
  country: Country
): { type: 'countries/add.confirm'; value: Country } => ({
  type: ADD_CONFIRM,
  value: country,
});
const setCursor = (
  cursor: string | undefined
): { type: 'countries/set_cursor'; cursor: string | undefined } => ({
  type: SET_CURSOR,
  cursor,
});

type CountriesActions =
  | ReturnType<typeof load>
  | ReturnType<typeof loadSuccess>
  | ReturnType<typeof loadError>
  | ReturnType<typeof orderBy>
  | ReturnType<typeof setKeyword>
  | ReturnType<typeof remove>
  | ReturnType<typeof addToggle>
  | ReturnType<typeof addConfirm>
  | ReturnType<typeof setCursor>;

const initializeCursorThunk = (): ThunkAction<
  void,
  RootState,
  null,
  CountriesActions
> => {
  return (dispatch, getState) => {
    const list = sortedCountries(getState());
    if (!list) {
      return;
    }

    const cursor = list[Math.min(PAGINATION, list.length) - 1].id;
    dispatch(setCursor(cursor));
  };
};

const loadThunk = (): ThunkAction<
  Promise<void>,
  RootState,
  null,
  CountriesActions
> => {
  return async (dispatch, getState) => {
    const state = getState();
    if (state.countries.pending) {
      return;
    }

    try {
      dispatch(load());
      const countries = await datasource.countries().get();
      dispatch(loadSuccess(countries));
      dispatch(initializeCursorThunk());
    } catch (e) {
      dispatch(loadError(e));
    }
  };
};

const orderByThunk = (
  value: CountriesOrderBy
): ThunkAction<void, RootState, null, CountriesActions> => {
  return (dispatch) => {
    dispatch(orderBy(value));
    dispatch(initializeCursorThunk());
  };
};

const setKeywordThunk = (
  value: string
): ThunkAction<void, RootState, null, CountriesActions> => {
  return (dispatch) => {
    dispatch(setKeyword(value));
    dispatch(initializeCursorThunk());
  };
};

const removeThunk = (
  idToRemove: string
): ThunkAction<void, RootState, null, CountriesActions> => {
  return (dispatch, getState) => {
    const state = getState();
    const list = sortedCountries(state);
    if (!list) {
      return;
    }

    if (idToRemove === state.countries.cursor) {
      const indexOfCursor = list.findIndex(
        ({ id }) => id === state.countries.cursor
      );
      const newCursor =
        indexOfCursor > 0 ? list[indexOfCursor - 1].id : undefined;
      dispatch(setCursor(newCursor));
    }

    dispatch(remove(idToRemove));
  };
};

const fetchMoreThunk = (): ThunkAction<
  void,
  RootState,
  null,
  CountriesActions
> => {
  return (dispatch, getState) => {
    const state = getState();
    const list = sortedCountries(state);
    if (!list) {
      return;
    }

    const indexOfCursor = list.findIndex(
      ({ id }) => id === state.countries.cursor
    );
    const nextCursor =
      list[Math.min(indexOfCursor + PAGINATION, list.length - 1)]?.id;
    dispatch(setCursor(nextCursor));
  };
};

type CountriesState = {
  pending: boolean;
  error?: Error;
  list?: { id: string; country: Country }[];
  cursor?: string;
  orderBy: CountriesOrderBy;
  order: CountriesOrder;
  keyword: string;
  add: boolean;
};

const initialState: CountriesState = {
  pending: false,
  orderBy: CountriesOrderBy.code,
  order: CountriesOrder.ascending,
  keyword: '',
  add: false,
};

export const actions = {
  load: loadThunk,
  orderBy: orderByThunk,
  setKeyword: setKeywordThunk,
  remove: removeThunk,
  addToggle,
  addConfirm,
  fetchMore: fetchMoreThunk,
};

export const reducer = (
  state: CountriesState = initialState,
  action: CountriesActions
): CountriesState => {
  switch (action.type) {
    case LOAD_INVOKE:
      return produce(state, (draft) => {
        draft.pending = true;
      });
    case LOAD_SUCCESS:
      return produce(state, (draft) => {
        draft.pending = false;
        draft.list = action.countries.map((country) => ({
          id: uuid.v4(),
          country,
        }));
      });
    case LOAD_ERROR:
      return produce(state, (draft) => {
        draft.pending = false;
        draft.error = action.error;
      });
    case ORDER_BY:
      return produce(state, (draft) => {
        if (draft.orderBy === action.value) {
          draft.order =
            draft.order === CountriesOrder.ascending
              ? CountriesOrder.descending
              : CountriesOrder.ascending;
        } else {
          draft.orderBy = action.value;
          draft.order = CountriesOrder.ascending;
        }
      });
    case SET_KEYWORD:
      return produce(state, (draft) => {
        draft.keyword = action.value;
      });
    case REMOVE:
      return produce(state, (draft) => {
        draft.list?.splice(
          draft.list?.findIndex(({ id }) => id === action.id),
          1
        );
      });
    case ADD_TOGGLE:
      return produce(state, (draft) => {
        if (draft.pending) {
          /* cannot start adding country when pending */
          return;
        }
        draft.add = !draft.add;
      });
    case ADD_CONFIRM:
      return produce(state, (draft) => {
        if (draft.pending || !draft.add || !draft.list) {
          return;
        }
        if (!isValidCountry(action.value)) {
          // eslint-disable-next-line no-console
          console.warn(`tried to add invalid country form`, action.value);
          return;
        }
        draft.list.push({ id: uuid.v4(), country: { ...action.value } });
      });
    case SET_CURSOR:
      return produce(state, (draft) => {
        draft.cursor = action.cursor;
      });
    default:
      return state;
  }
};
