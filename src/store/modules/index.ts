import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import {
  actions as countriesAction,
  reducer as countriesReducer,
} from './countries';

export const actions = {
  countries: countriesAction,
};

const rootReducer = combineReducers({
  countries: countriesReducer,
  form: reduxFormReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
