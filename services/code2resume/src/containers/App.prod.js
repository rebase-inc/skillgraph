import React, { Component } from 'react';
import SkillBrowser from './SkillBrowser';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';

import '../css/main.css';

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SkillBrowser />
      </Provider>
    );
  }
}
