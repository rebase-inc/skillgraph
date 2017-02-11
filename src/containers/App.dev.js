import React, { Component } from 'react';
import MainView from './MainView';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import rootSaga from '../sagas';

import DevTools from './DevTools';

import '../css/main.css';

const store = configureStore();
console.log('running sagas', rootSaga);
store.runSaga(rootSaga)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <MainView />
          <DevTools />
        </div>
      </Provider>
    );
  }
}
