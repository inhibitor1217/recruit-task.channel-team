import produce from 'immer';
import { ThunkAction } from 'redux-thunk';
import * as uuid from 'uuid';
import { RootState } from '.';
import datasource from '../../datasource';

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

const load = () => ({ type: LOAD_INVOKE });
const loadSuccess = (countries: Country[]) => ({
  type: LOAD_SUCCESS,
  countries,
});
const loadError = (error: Error) => ({ type: LOAD_ERROR, error });
const orderBy = (
  value: CountriesOrderBy
): { type: 'countries/order_by'; value: CountriesOrderBy } => ({
  type: ORDER_BY,
  value,
});
const setKeyword = (
  value: string
): { type: 'countries/set_keyword'; value: string } => ({
  type: SET_KEYWORD,
  value,
});

type CountriesActions =
  | ReturnType<typeof load>
  | ReturnType<typeof loadSuccess>
  | ReturnType<typeof loadError>
  | ReturnType<typeof orderBy>
  | ReturnType<typeof setKeyword>;

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
    } catch (e) {
      dispatch(loadError(e));
    }
  };
};

type CountriesState = {
  pending: boolean;
  error?: Error;
  list?: { id: string; country: Country }[];
  orderBy: CountriesOrderBy;
  order: CountriesOrder;
  keyword: string;
};

const initialState: CountriesState = {
  pending: false,
  orderBy: CountriesOrderBy.code,
  order: CountriesOrder.ascending,
  keyword: '',
};

export const actions = {
  load: loadThunk,
  orderBy,
  setKeyword,
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
    default:
      return state;
  }
};
