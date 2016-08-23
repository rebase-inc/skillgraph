import React, { Component } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

import SKILLS from './mock/skills';

const COLUMN_WIDTH = 6;
const COLUMN_HEIGHT = 60;
const DOT_RADIUS = 1.8;
const HORIZONTAL_SPACING = 3;
const VERTICAL_SPACING = 3;
const COLUMN_SPACING = 45;
const FONT_SIZE = 10;
const COLUMN_PIXELS = COLUMN_SPACING + COLUMN_WIDTH * (2 * DOT_RADIUS + HORIZONTAL_SPACING) - HORIZONTAL_SPACING; // for convenience

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
    let stackedTech = language.technologies.sort((a, b) => b - a).reduce((stacked, percentage, name) => {
      let numCircles = Math.ceil(language.skill * COLUMN_WIDTH * COLUMN_HEIGHT * percentage / sumOfTechnologies);
      stacked.push({ name, start: total, end: total + numCircles });
      total += numCircles;
      return stacked;
    }, []);
    stackedTech.push({ name: '', start: total, end: COLUMN_WIDTH * COLUMN_HEIGHT }); // placeholders
    return stackedTech;
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
    languages.attr('data-name', data => data.name)
      .attr('transform', (data, ind) => 'translate(' + ((width / 2) + COLUMN_PIXELS * (ind - SKILLS.size / 2)) + ',0)')

    languages.append('text')
      .text(language => language.name.toUpperCase())
      .attr('class', 'language')
      .attr('text-anchor', 'middle')
      .attr('x', (COLUMN_PIXELS - COLUMN_SPACING) / 2)
      .attr('y', (2 * DOT_RADIUS + VERTICAL_SPACING) * COLUMN_HEIGHT)
      .attr('font-size', FONT_SIZE)
      .attr('fill', 'hsla(0, 0%, 85%, 1)')
      .attr('dy', FONT_SIZE + 4 * VERTICAL_SPACING);

    let technologies = languages.selectAll('g').data(this.stackTechnologies);
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
      .attr('y', (2 * DOT_RADIUS + VERTICAL_SPACING) * COLUMN_HEIGHT)
      .attr('font-size', FONT_SIZE)
      .attr('fill', 'none')
      .attr('dy', FONT_SIZE + 4 * VERTICAL_SPACING);

    let dots = technologies.selectAll('circle').data(data => _.range(data.start, data.end));
    dots.exit().remove();
    dots = dots.enter().append('circle').merge(dots);
    dots.attr('r', DOT_RADIUS)
      .attr('cx', data => (data % COLUMN_WIDTH) * (2 * DOT_RADIUS + HORIZONTAL_SPACING))
      .attr('cy', data => (2 * DOT_RADIUS + VERTICAL_SPACING) * (COLUMN_HEIGHT - Math.floor(data / COLUMN_WIDTH)))
      .attr('stroke', 'transparent')
      .attr('stroke-width', 10);
  }
  render() {
    return (
      <div className='skillsGraph' ref={(element) => { this.div = element }}>
      </div>
    );
  }
}

export default SkillsGraph;
