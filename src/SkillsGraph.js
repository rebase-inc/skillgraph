import React, { Component } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

import SKILLS from './mock/skills';

const GROUP_WIDTH = 6;
const GROUP_HEIGHT = 60;
const DOT_RADIUS = 1.8;
const DOT_SPACING = 3;
const COLUMN_SPACING = 45;
const FONT_SIZE = 10;
const COLUMN_PIXELS = COLUMN_SPACING + GROUP_WIDTH * (2 * DOT_RADIUS + DOT_SPACING) - DOT_SPACING; // for convenience
const DOTS_PER_GROUP = GROUP_WIDTH * GROUP_HEIGHT;

class SkillsGraph extends Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('checking');
    console.log('state is ', state);
    return false;
  }
  componentWillUpdate(prevProps, prevState) {
    console.log('component will update');
  }
  // This static method takes a list of technologies and their percentiles like [{ name: 'React', : percentile: 0.75 }, ...]
  // and converts them to a one dimensional array with "stacking", e.g.:
  // [{ name: 'React', start: 0.0, end: 0.23 }, { name: 'Angular', start: 0.23, end: 0.42 }, ...] where
  // SUM(0 -> k - 1) (end_k - start_k) == language.percentile
  static stackTechnologies(language) {
    let percentFilled = 0.0;
    let sumOfTechnologies = language.technologies.reduce((sum, tech) => sum + tech.percentile, 0.0);
    return language.technologies.sort((a, b) => b.percentile - a.percentile).reduce((stacked, tech) => {
      stacked.push(Object.assign(tech, { start: percentFilled, end: percentFilled + (language.percentile * tech.percentile / sumOfTechnologies) }));
      percentFilled += (language.percentile * tech.percentile / sumOfTechnologies);
      return stacked;
    }, []);
  }
  static positionDot(startPercentile, endPercentile, dotNumber) {
    let startDot = Math.floor(startPercentile * DOTS_PER_GROUP);
    let endDot = Math.floor(endPercentile * DOTS_PER_GROUP);
    let spacing = 2 * DOT_RADIUS + DOT_SPACING;

    dotNumber %= (endDot - startDot);

    let x = spacing * ((startDot + dotNumber) % GROUP_WIDTH);
    let y = spacing * (GROUP_HEIGHT - Math.floor((startDot + dotNumber) / GROUP_WIDTH));
    return { x, y }
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

    let languages = this.mainGroup.selectAll('g').data(SKILLS.toJS());
    languages.exit().remove();
    languages = languages.enter().append('g').merge(languages);
    languages.attr('data-name', data => data.name)
      .attr('transform', (data, ind) => 'translate(' + ((width / 2) + COLUMN_PIXELS * (ind - SKILLS.size / 2)) + ',0)')

    languages.append('text')
      .text(language => language.name)
      .attr('class', 'language')
      .attr('text-anchor', 'middle')
      .attr('x', (COLUMN_PIXELS - COLUMN_SPACING) / 2)
      .attr('y', (2 * DOT_RADIUS + DOT_SPACING) * GROUP_HEIGHT)
      .attr('font-size', FONT_SIZE)
      .attr('fill', 'hsla(0, 0%, 85%, 1)')
      .attr('dy', FONT_SIZE + 4 * DOT_SPACING)
      .on('click', language => this.setState({ language: language.name }));

    let technologies = languages.selectAll('g').data(SkillsGraph.stackTechnologies);
    technologies.exit().remove();
    technologies = technologies.enter().append('g').merge(technologies);
    technologies.attr('data-name', data => data.name)
      .style('fill', data => data.name ? 'hsla(0, 0%, 85%, 1)' : 'hsla(0, 0%, 85%, 0.24)')
      .on('mouseover', function(data) {
        if (data.name) {
          d3.select(this).style('fill', 'hsla(37, 89%, 52%, 1)');
          d3.select(this.parentNode).select('.language').style('fill', 'none');
          d3.select(this).select('.technology').style('fill', 'hsla(37, 89%, 52%, 1)');
        }
      })
      .on('mouseout', function(data) {
        if (data.name) {
          d3.select(this).style('fill', 'hsla(0, 0%, 85%, 1)');
          d3.select(this.parentNode).select('.language').style('fill', 'hsla(0, 0%, 85%, 1)');
          d3.select(this).select('text').style('fill', 'none');
        }
      });

    technologies.append('text')
      .text(technology => technology.name.toUpperCase())
      .attr('class', 'technology')
      .attr('text-anchor', 'middle')
      .attr('x', (COLUMN_PIXELS - COLUMN_SPACING) / 2)
      .attr('y', (2 * DOT_RADIUS + DOT_SPACING) * GROUP_HEIGHT)
      .attr('font-size', FONT_SIZE)
      .attr('fill', 'none')
      .attr('dy', FONT_SIZE + 4 * DOT_SPACING);

    let dots = technologies.selectAll('circle')
      .data(technology => _.range(Math.floor(DOTS_PER_GROUP * technology.start), Math.floor(DOTS_PER_GROUP * technology.end)));
    dots.exit().remove();
    dots = dots.enter().append('circle').merge(dots);
    dots.attr('r', DOT_RADIUS)
      .attr('cx', function(dotIndex) {
        let language = d3.select(this.parentNode).datum();
        return SkillsGraph.positionDot(language.start, language.end, dotIndex).x
      })
      .attr('cy', function(dotIndex) {
        let language = d3.select(this.parentNode).datum();
        return SkillsGraph.positionDot(language.start, language.end, dotIndex).y
      })
      .attr('stroke', 'transparent')
      .attr('stroke-width', 10); // terrible hack
  }
  render() {
    return <div className='skillsGraph' ref={(element) => { this.div = element }} />;
  }
}

export default SkillsGraph;
