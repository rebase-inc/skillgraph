import React, { Component } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

import SKILLS from './mock/skills';

const COLUMN_WIDTH = 6;
const COLUMN_HEIGHT = 60;
const DOT_RADIUS = 2.5;
const HORIZONTAL_SPACING = 4;
const VERTICAL_SPACING = 4;

class SkillsGraph extends Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  shouldComponentUpdate() {
    return false;
  }
  stackTechnologies(language) {
    let total = 0;
    let sumOfTechnologies = language.technologies.reduce((sum, percentage) => { sum += percentage; return sum }, 0);
    return language.technologies.sort((a, b) => a - b).reduce((stacked, percentage, name) => {
      let numCircles = Math.ceil(language.skill * COLUMN_WIDTH * COLUMN_HEIGHT * percentage / sumOfTechnologies);
      stacked.push({ name, start: total, end: total + numCircles });
      total += numCircles + 1;
      return stacked;
    }, []).reverse();
  }
  componentDidMount() {
    const width = 600;
    const height = 500;
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

    let technologies = languages.selectAll('g').data(this.stackTechnologies);
    technologies.exit().remove();
    technologies = technologies.enter().append('g').merge(technologies);
    technologies.attr('data-name', data => data.name);

    let dots = technologies.selectAll('circle').data(data => _.range(data.start, data.end));
    dots.exit().remove();
    dots = dots.enter().append('circle').merge(dots);
    dots.attr('r', DOT_RADIUS)
      .attr('cx', data => (data % COLUMN_WIDTH) * (2 * DOT_RADIUS + HORIZONTAL_SPACING))
      .attr('cy', data => (2 * DOT_RADIUS + VERTICAL_SPACING) * (COLUMN_HEIGHT - Math.floor(data / COLUMN_WIDTH)))
      .style('fill', '#D8D8D8');
  }
  render() {
    return (
      <div className='skillsGraph' ref={(element) => { this.div = element }}>
      </div>
    );
  }
}

export default SkillsGraph;
