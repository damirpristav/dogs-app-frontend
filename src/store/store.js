import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import combinedReducer from './reducers/combinedReducer';

const intialState = {};

const store = createStore(
  combinedReducer,
  intialState,
  applyMiddleware(thunk)
);

export default store;