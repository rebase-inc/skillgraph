import React, { Component } from 'react';
import MainView from './MainView';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';

import '../css/main.css';

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainView />
      </Provider>
    );
  }
}
