import React, { Component } from 'react';

import SkillBrowser from './SkillBrowser';
import AccountDisplay from './AccountDisplay';

export default class MainView extends Component {
  render() {
    const { languages, actions, account } = this.props;
    return (
      <div className='App'>
        <AccountDisplay account={account} actions={actions} />
        <SkillBrowser languages={languages} actions={actions} />
      </div>
    );
  }
}
