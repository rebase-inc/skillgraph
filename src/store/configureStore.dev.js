import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import * as reducers from '../reducers';
import createSagaMiddleware from 'redux-saga'
import DevTools from '../containers/DevTools';
import createLogger from 'redux-logger';
import { persistState } from 'redux-devtools';
import Immutable from 'immutable';

const loggerMiddleware = createLogger({
  stateTransformer: (state) => {
    var newState = {};
    for (var i of Object.keys(state)) {
      if (Immutable.Iterable.isIterable(state[i])) {
        newState[i] = state[i].toJS();
      } else {
        newState[i] = state[i];
      }
    };
    return newState;
  }
});

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState) {
  const reducer = combineReducers(reducers);
  const sagaMiddleware = createSagaMiddleware();
  const store = {
    ...compose(applyMiddleware(sagaMiddleware, loggerMiddleware), DevTools.instrument())(createStore)(reducer, initialState),
    runSaga: sagaMiddleware.run,
  }
  if (module.hot) {
    // the hot swap of the reducers needs to be done explicitly
    module.hot.accept('../reducers', () => store.replaceReducer(combineReducers(require('../reducers'))));
  }
  return store;
};
