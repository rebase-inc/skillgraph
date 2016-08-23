import React, { Component } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

import SKILLS from './mock/skills';

const COLUMN_WIDTH = 6;
const COLUMN_HEIGHT = 60;

class SkillsGraph extends Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  shouldComponentUpdate() {
    return false;
  } 
  componentDidMount() {
    const width = 600;
    const height = 400;
    const margin = { top: 50, bottom: 50, left: 50, right: 50 };
    let svg = d3.select(this.div).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);
    this.mainGroup = svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    
    let languages = this.mainGroup.selectAll('g').data(SKILLS.toArray());
    languages.exit().remove();
    languages = languages.enter().append('g').merge(languages);
    languages.attr('data-name', data => data.name);

    let technologies = languages.selectAll('g').data(language => language.technologies.map((percentage, name) => ({ name, percentage })).toArray());
    technologies.exit().remove();
    technologies = technologies.enter().append('g').merge(technologies);
    technologies.attr('data-name', data => data.name); 

    let dots = technologies.selectAll('circle').data(data => _.range(data.percentage));
    dots.exit().remove();
    dots = dots.enter().append('circle').merge(dots);
    dots.attr('r', 5).style('fill', '#D8D8D8');
  }
  render() {
    return (
      <div className='skillsGraph' ref={(element) => { this.div = element }}>
        helloo
      </div>
    );
  }
}

export default SkillsGraph;
