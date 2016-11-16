import * as d3 from 'd3';
import React, { Component } from 'react';

class D3LanguageDisplay {
  constructor(parentElement, language, select, selected, options) {
    this.width = options ? options.width || 600 : 600;
    this.height = options ? options.height || 400 : 400;
    this.svg = d3.select(parentElement).append('svg')
      .attr('viewBox', '0 0 ' + this.width + ' ' + this.height)
      .attr('preserveAspectRatio', 'none')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g');
    this.select = select;
    this.update(language, selected);
  }
  update(language, selected) {
    let skills = language.childSkills.sort((a, b) => b.impact - a.impact).toArray();
    let impactLines = this.svg.selectAll('.impact').data(skills);
    
    impactLines.exit().transition().duration(300)
      .attr('x1', 0)
      .attr('x2', 0)
      .remove();
    impactLines = impactLines.enter().append('line')
      .attr('stroke-width', 0)
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', this.height)
      .attr('y2', this.height)
      .merge(impactLines);
    
    impactLines.attr('class', 'impact')
      .attr('data-skill', skill => skill.name)
      .attr('data-selected', skill => skill == selected);

    impactLines.transition().delay(300).duration(300)
      .attr('x1', 0)
      .attr('x2', skill => this.width * skill.impact / skills[0].impact)
      .attr('y1', (skill, index) => this.height * (index + 1) / skills.length)
      .attr('y2', (skill, index) => this.height * (index + 1) / skills.length)
      .attr('stroke-width', -8 + this.height / skills.length);

    let rankingLines = this.svg.selectAll('.ranking').data(skills);
    rankingLines.exit().transition().duration(300)
      .attr('x1', 0)
      .attr('x2', 0)
      .remove();
    rankingLines = rankingLines.enter().append('line')
      .attr('stroke-width', 0)
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', this.height)
      .attr('y2', this.height)
      .merge(rankingLines);
    
    rankingLines
      .attr('class', 'ranking')
      .attr('data-skill', skill => skill.name)
      .attr('data-selected', skill => skill == selected);

    
    rankingLines.transition().delay(300).duration(300)
      .attr('x1', 0)
      .attr('x2', skill => this.width * skill.rank * skill.impact / skills[0].impact)
      .attr('y1', (skill, index) => this.height * (index + 1) / skills.length)
      .attr('y2', (skill, index) => this.height * (index + 1) / skills.length)
      .attr('stroke-width', -8 + this.height / skills.length);
    
    let hiddenLines = this.svg.selectAll('.hidden').data(skills);
    hiddenLines.exit().remove();
    hiddenLines = hiddenLines.enter().append('line').merge(hiddenLines);
    hiddenLines.attr('class', 'hidden').attr('data-skill', skill => skill.name)

    hiddenLines.transition().delay(300).duration(300)
      .attr('x1', 0)
      .attr('x2', this.width)
      .attr('y1', (skill, index) => this.height * (index + 1) / skills.length)
      .attr('y2', (skill, index) => this.height * (index + 1) / skills.length)
      .attr('stroke-width', this.height / skills.length)
    
    hiddenLines.on('mouseover', this.select);
  }
}

export default class LanguageDisplay extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount() {
    this.d3LanguageDisplay = new D3LanguageDisplay(
      this.div, 
      this.props.language,
      this.props.selectTechnology,
      this.props.technology
    );
  }
  shouldComponentUpdate(props, state) {
    this.d3LanguageDisplay.update(props.language, props.technology);
    return false;
  }
  render() {
    return <div className='languageDisplay' ref={(el) => { this.div = el }} /> 
  }
}

