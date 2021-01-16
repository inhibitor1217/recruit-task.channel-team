import produce from 'immer';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '.';
import datasource from '../../datasource';

const LOAD_INVOKE = 'countries/load.invoke' as const;
const LOAD_SUCCESS = 'countries/load.success' as const;
const LOAD_ERROR = 'contries/load.error' as const;

const load = () => ({ type: LOAD_INVOKE });
const loadSuccess = (countries: Country[]) => ({
  type: LOAD_SUCCESS,
  countries,
});
const loadError = (error: Error) => ({ type: LOAD_ERROR, error });

type CountriesActions =
  | ReturnType<typeof load>
  | ReturnType<typeof loadSuccess>
  | ReturnType<typeof loadError>;

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
  list?: Country[];
};

const initialState: CountriesState = {
  pending: false,
};

export const actions = {
  load: loadThunk,
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
        draft.list = action.countries;
      });
    case LOAD_ERROR:
      return produce(state, (draft) => {
        draft.pending = false;
        draft.error = action.error;
      });
    default:
      return state;
  }
};
