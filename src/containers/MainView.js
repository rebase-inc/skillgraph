import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MainViewComponent from '../components/MainView';
import LoginBox from '../components/LoginBox';
import LoadingBox from '../components/LoadingBox';

import * as actions from '../actions';


class MainView extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount() {
    this.props.restoreState();
  }
  render() {
    const { jobs, logout, languages, modules, auth, githubUser, startScan } = this.props;
    if (!auth) {
      return <LoginBox />;
    } else if (!!jobs.size) {
      return <LoadingBox jobs={jobs} />;
    } else {
      return <MainViewComponent user={githubUser} languages={languages} modules={modules} scan={startScan} logout={logout} />;
    }
  }
}

let mapStateToProps = state => ({
  auth: state.entities.auth,
  jobs: state.entities.jobs,
  languages: state.entities.languages,
  modules: state.entities.modules,
  githubUser: state.entities.githubUsers.first(),
});
export default connect(mapStateToProps, {
  restoreState: actions.restoreState,
  startScan: actions.startScan,
  logout: actions.logout,
})(MainView);
