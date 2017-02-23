import React, { Component } from 'react';
import LanguageIcon from './LanguageIcon';

import RebaseLogo from './RebaseLogo';
import AccountDisplay from './AccountDisplay';
import LanguageSelector from './LanguageSelector';
import Notification from './Notification';

export default class InfoPanel extends Component {
  render() {
    const { user, scan, language, languages, selectLanguage } = this.props;
    return (
      <div className='infoPanel'>
        <RebaseLogo />
        <AccountDisplay user={user} />
        <LanguageSelector languages={languages} selected={language} select={selectLanguage} />
        { user.outOfDate ? <Notification scan={scan} /> : null }
      </div>
    );
  }
}
