import { combineReducers } from 'redux';

import provider from './provider';
import filter from './filter';
import settings from './settings';
import user from './user';

export default combineReducers({ provider, filter, settings, user });
