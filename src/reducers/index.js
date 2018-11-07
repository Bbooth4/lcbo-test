import { combineReducers } from 'redux';
import beverages from './beverages';
import stores from './stores';

const rootReducer = combineReducers({
  beverages,
  stores
});

export default rootReducer;
