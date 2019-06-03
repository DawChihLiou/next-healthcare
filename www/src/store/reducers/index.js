import { combineReducers } from 'redux';

import provider from './provider';
import filter from './filter';
import settings from './settings';

export default combineReducers({ provider, filter, settings });
