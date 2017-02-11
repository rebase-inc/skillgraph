import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga'
import * as reducers from '../reducers';

export default function configureStore(initialState) {
  const reducer = combineReducers(reducers);
  const sagaMiddleware = createSagaMiddleware();
  return {
    ...compose(applyMiddleware(sagaMiddleware))(createStore)(reducer, initialState),
    runSaga: sagaMiddleware.run,
  }
};
