import React, { Component } from 'react';

import GithubLogo from './GithubLogo';

export default class AccountDisplay extends Component {
  render() {
    const { actions, account } = this.props;
    return (
      <div className='accountDisplay'>
        <Username username={account.login} />
        <Logout logout={actions.logout} />
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
