import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as UserActions from '../actions/UserActions';

class SkillBrowser extends Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (
      <div id='app'>
        

      </div>
    );
  }
}

let mapStateToProps = state => ({ user: state.user, });
let mapDispatchToProps = dispatch => ({ actions: bindActionCreators(UserActions, dispatch), });
export default connect(mapStateToProps, mapDispatchToProps)(SkillBrowser);
