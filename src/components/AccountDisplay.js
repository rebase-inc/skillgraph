import React, { Component } from 'react';

import GithubLogo from './GithubLogo';

export default class AccountDisplay extends Component {
  render() {
    const { logout, user } = this.props;
    console.log('user is ', user.toJS());
    return (
      <div className='accountDisplay'>
        <Username username={user.login} />
        <Logout logout={logout} />
      </div>
    );
  }
}

const Username = (props) => (
  <span className='username'>
    <GithubLogo />
    <span>{props.username}</span>
  </span>
)

const Logout = (props) => (
  <span className='logout' onClick={props.logout}>{'Log Out'}</span>
)
