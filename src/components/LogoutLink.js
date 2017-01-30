import React, { Component } from 'react';

export default class AccountDisplay extends Component {
  render() {
    const { actions } = this.props;
    return (
      <div className='App'>
        <AccountDisplay />
        <SkillBrowser languages={languages} actions={actions} /> 
      </div>
    );
  }
}
