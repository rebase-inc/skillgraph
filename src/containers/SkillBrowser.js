import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SkillBrowserComponent from '../components/SkillBrowser';
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
    return githubAccount === undefined ? <a style={{color: 'white'}} href='https://github.com/login/oauth/authorize?scope= repo&client_id=215657378a75ef37b93e'>{'click here'}</a> :
      <SkillBrowserComponent skills={skills} actions={actions} />;
  }
}

let mapStateToProps = state => ({ user: state.user, skills: state.skills, githubAccount: state.githubAccounts.first() });
let mapDispatchToProps = dispatch => ({ actions: bindActionCreators(UserActions, dispatch), });
export default connect(mapStateToProps, mapDispatchToProps)(SkillBrowser);
