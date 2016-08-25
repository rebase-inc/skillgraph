import React, { Component } from 'react';

import * as graphs from './utils/graphs';

import SKILLS from './mock/skills';

class SkillsGraph extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { language: null };
    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  // Note: This is technically improper use of shouldComponentMount, but its the only
  // place that we have access to new props after the componet has mounted
  shouldComponentUpdate(props, state) {
    const { language } = props;
    this.d3chart.update(SKILLS.toJS(), language);
    return false;
  }
  componentDidMount() {
    const options = { 
      width: 600, 
      height: 400,
      margin: { 
        top: 50, 
        bottom: 50, 
        left: 50, 
        right: 50 
      },
    }
    this.d3chart = new graphs.SkillsChart(this.div, SKILLS.toJS(), options, this.props.selectLanguage);
  }
  render() {
    return <div className='skillsGraph' ref={(element) => { this.div = element }} />;
  }
}

export default SkillsGraph;
