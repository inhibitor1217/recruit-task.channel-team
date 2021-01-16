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

type CountriesActions =
  | ReturnType<typeof load>
  | ReturnType<typeof loadSuccess>
  | ReturnType<typeof loadError>
  | ReturnType<typeof orderBy>;

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
};

const initialState: CountriesState = {
  pending: false,
  orderBy: CountriesOrderBy.code,
  order: CountriesOrder.ascending,
};

export const actions = {
  load: loadThunk,
  orderBy,
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
    default:
      return state;
  }
};
