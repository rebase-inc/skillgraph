import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MainViewComponent from '../components/MainView';
import LoginBox from '../components/LoginBox';
import LoadingBox from '../components/LoadingBox';

import * as UserActions from '../actions/userActions';

class MainView extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount() {
    this.props.actions.restoreAuth();
  }
  render() {
    const { languages, githubAccount, actions } = this.props;
    if (githubAccount === undefined) {
      return <LoginBox login={actions.login} />;
    } else if (languages.size === 0) {
      return <LoadingBox />;
    } else {
      return <MainViewComponent account={githubAccount} languages={languages} actions={actions} />;
    }
  }
}

let mapStateToProps = state => ({ languages: state.skills, githubAccount: state.githubAccounts.first() });
let mapDispatchToProps = dispatch => ({ actions: bindActionCreators(UserActions, dispatch), });
export default connect(mapStateToProps, mapDispatchToProps)(MainView);
