import React, { Component } from 'react';
import GithubLogo from './GithubLogo';

import { LOGIN_URL } from '../utils/api';

class LoginBox extends Component {
  render() {
    return (
      <div className='loginBox'>
        <div>{ 'Log in or sign up' }</div>
        <div>{ 'with GitHub' }</div>
        <a href={LOGIN_URL}>
          {'Authorize'}
        </a>
      </div>
    );
  }
}

export default LoginBox;
