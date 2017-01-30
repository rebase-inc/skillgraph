import React, { Component } from 'react';

import App from './SkillBrowser';

export default class App extends Component {
  render() {
    const { languages, actions } = this.props;
    return (
      <div className='App'>
        <SkillBrowser languages={languages} actions={actions} /> 
      </div>
    );
  }
}
