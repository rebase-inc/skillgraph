import React, { Component } from 'react';
import MainView from './MainView';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import rootSaga from '../sagas';

import '../css/main.css';

const store = configureStore();
store.runSaga(rootSaga)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainView />
      </Provider>
    );
  }
}
