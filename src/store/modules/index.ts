import { combineReducers } from 'redux';

import {
  actions as countriesAction,
  reducer as countriesReducer,
} from './countries';

export const actions = {
  countries: countriesAction,
};

const rootReducer = combineReducers({
  countries: countriesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
