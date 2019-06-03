import { combineReducers } from 'redux';
import filterSettings from './filter';

export default combineReducers({
  filter: filterSettings,
});
