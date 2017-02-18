import React, { Component } from 'react';

import GithubLogo from './GithubLogo';

export default class AccountDisplay extends Component {
  render() {
    const { logout, user } = this.props;
    return (
      <div className='accountDisplay'>
        <span className='username' onClick={window.open.bind(null, 'https://github.com/' + user.login)}>{ user.login }</span>
        <span className='logout' onClick={logout}>{'Logout'}</span>
      </div>
    );
  }
}
