import React, { Component } from 'react';

import SkillBrowser from './SkillBrowser';
import AccountDisplay from './AccountDisplay';
import ScanButton from './ScanButton';

export default class MainView extends Component {
  render() {
    const { languages, modules, user, scan, logout } = this.props;
    return (
      <div className='App'>
        <AccountDisplay user={user} logout={logout} />
        <SkillBrowser languages={languages} modules={modules} />
        { user.outOfDate ? <ScanButton scan={scan} /> : null }
      </div>
    );
  }
}
