import React, { Component } from 'react';
import GithubLogo from './GithubLogo';

class LoginBox extends Component {
  render() {
    console.log(process.env);
    return (
      <div className='loginBox'>
        <div>{ 'Log in or sign up' }</div>
        <div>{ 'with GitHub' }</div>
        <a href={'https://github.com/login/oauth/authorize?scope=repo&client_id=' + process.env.REACT_APP_GITHUB_APP_CLIENT_ID} >
          {'Authorize'}
        </a>
      </div>
    );
  }
}

export default LoginBox;
