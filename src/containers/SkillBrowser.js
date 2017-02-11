import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import App from '../components/App';
import LoginBox from '../components/LoginBox';
import LoadingBox from '../components/LoadingBox';

import * as UserActions from '../actions/userActions';

class MainView extends Component {
  render() {
    return <div>{'12341234'}</div>
  }
}

let mapStateToProps = state => ({ user: state.user, languages: state.skills, githubAccount: state.githubAccounts.first() });
let mapDispatchToProps = dispatch => ({ actions: bindActionCreators(UserActions, dispatch), });
export default connect(mapStateToProps, mapDispatchToProps)(MainView);
