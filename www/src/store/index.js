import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import reducer from './reducers';

const middlewares = [thunk];

export default function configureStore(initialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
}
