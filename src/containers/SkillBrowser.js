import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SkillBrowserComponent from '../components/SkillBrowser';
import * as UserActions from '../actions/userActions';

class SkillBrowser extends Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    const { skills, actions } = this.props;
    return <SkillBrowserComponent skills={skills} actions={actions} />;
  }
}

let mapStateToProps = state => ({ user: state.user, });
let mapDispatchToProps = dispatch => ({ actions: bindActionCreators(UserActions, dispatch), });
export default connect(mapStateToProps, mapDispatchToProps)(SkillBrowser);
