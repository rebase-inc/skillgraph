import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SkillBrowserComponent from '../components/SkillBrowser';
import LoginBox from '../components/LoginBox';
import LoadingBox from '../components/LoadingBox';

import * as UserActions from '../actions/userActions';

class SkillBrowser extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount() {
    this.props.actions.restoreAuth();
  }
  render() {
    const { skills, githubAccount, actions } = this.props;
    if (githubAccount === undefined) {
      return <LoginBox />;
    } else if (skills.size === 0) {
      return <LoadingBox />;
    } else {
      return <SkillBrowserComponent skills={skills} actions={actions} />;
    }
  }
}

let mapStateToProps = state => ({ user: state.user, skills: state.skills, githubAccount: state.githubAccounts.first() });
let mapDispatchToProps = dispatch => ({ actions: bindActionCreators(UserActions, dispatch), });
export default connect(mapStateToProps, mapDispatchToProps)(SkillBrowser);
