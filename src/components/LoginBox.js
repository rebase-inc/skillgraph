import React, { Component } from 'react';
import GithubLogo from './GithubLogo';

class LoginBox extends Component {
  render() {
    return (
      <div className='loginBox'>
        <div>{ 'Log in or sign up' }</div>
        <div>{ 'with GitHub' }</div>
        <a href='https://github.com/login/oauth/authorize?scope=repo&client_id=215657378a75ef37b93e'>
          {'Authorize'}
        </a>
      </div>
    );
  }
}

export default LoginBox;
