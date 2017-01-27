import * as d3 from 'd3';
import React, { Component } from 'react';

const REMOVE_DURATION = (oldSkills, newSkills) => 300;
const REMOVE_DELAY = (oldSkills, newSkills) => 0;
const MOVE_DURATION = (oldSkills, newSkills) => 300;
const MOVE_DELAY = (oldSkills, newSkills) => oldSkills.length > newSkills.length ? 300 : 0;

class D3LanguageDisplay {
  constructor(parentElement, language, module, selectModule, options) {
    this.width = options ? options.width || 600 : 600;
    this.height = options ? options.height || 400 : 400;
    this.max_count = options ? options.max_count || 30 : 30;
    this.svg = d3.select(parentElement).append('svg')
      .attr('viewBox', '0 0 ' + this.width + ' ' + this.height)
      .attr('preserveAspectRatio', 'none')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g');
    this.selectModule = selectModule;
    this.update(language, module);
  }
  getBarWidth(module, maxRelevance) {
    return module.name == '__stdlib__' ? this.width : 0.9 * this.width * module.relevance / maxRelevance;
  }
  update(language, module) {
    let modules = language.modules.sort((a, b) => b.relevance - a.relevance).toArray();
    let maxRelevance = Math.max(...modules.filter(s => s.name != '__stdlib__').map(s => s.relevance));
    let oldSkills = this.svg.selectAll('.impact').data();

    let impactLines = this.svg.selectAll('.impact').data(modules);
    let rankingLines = this.svg.selectAll('.ranking').data(modules);
    let hiddenLines = this.svg.selectAll('.hidden').data(modules);
    let strokeWidth = Math.max(8, -30 + this.height / modules.length);

    // remove lines if we have too many
    impactLines.exit().transition().duration(REMOVE_DURATION).delay(REMOVE_DELAY).attr('x1', 0).attr('x2', 0).remove();
    rankingLines.exit().transition().duration(REMOVE_DURATION).delay(REMOVE_DELAY).attr('x1', 0).attr('x2', 0).remove();
    hiddenLines.exit().transition().duration(REMOVE_DURATION).delay(REMOVE_DELAY).attr('x1', 0).attr('x2', 0).remove();

    // add lines if we have too few
    impactLines = impactLines.enter().append('line')
      .attr('stroke-width', 0).attr('x1', 0).attr('x2', 0).attr('y1', this.height).attr('y2', this.height)
      .merge(impactLines);
    rankingLines = rankingLines.enter().append('line')
      .attr('stroke-width', 0).attr('x1', 0).attr('x2', 0).attr('y1', this.height).attr('y2', this.height)
      .merge(rankingLines);
    hiddenLines = hiddenLines.enter().append('line')
      .attr('stroke-width', 0).attr('x1', 0).attr('x2', 0).attr('y1', this.height).attr('y2', this.height)
      .merge(hiddenLines);

    // add proper classes and names
    impactLines.attr('class', 'impact').attr('data-skill', skill => skill.name).attr('data-selected', skill => module ? skill.name == module.name : false);
    rankingLines.attr('class', 'ranking').attr('data-skill', skill => skill.name).attr('data-selected', skill => module ? skill.name == module.name : false);
    hiddenLines.attr('class', 'hidden').attr('data-skill', skill => skill.name);

    // transition to new position
    impactLines.transition().delay(MOVE_DELAY(oldSkills, modules)).duration(MOVE_DURATION)
      .attr('x1', 0)
      .attr('x2', skill => this.getBarWidth(skill, maxRelevance))
      .attr('y1', (skill, index) => (this.height - strokeWidth) * (index + 1) / modules.length)
      .attr('y2', (skill, index) => (this.height - strokeWidth) * (index + 1) / modules.length)
      .attr('stroke-width', strokeWidth)

    rankingLines.transition().delay(MOVE_DELAY(oldSkills, modules)).duration(MOVE_DURATION)
      .attr('x1', 0)
      .attr('x2', skill => (1 - skill.rank / skill.population) * this.getBarWidth(skill, maxRelevance))
      .attr('y1', (skill, index) => (this.height - strokeWidth) * (index + 1) / modules.length)
      .attr('y2', (skill, index) => (this.height - strokeWidth) * (index + 1) / modules.length)
      .attr('stroke-width', strokeWidth);

    hiddenLines.transition().delay(MOVE_DELAY(oldSkills, modules)).duration(MOVE_DURATION)
      .attr('x1', 0)
      .attr('x2', this.width)
      .attr('y1', (skill, index) => (this.height - strokeWidth) * (index + 1) / modules.length)
      .attr('y2', (skill, index) => (this.height - strokeWidth) * (index + 1) / modules.length)
      .attr('stroke-width', this.height / modules.length)

    // add mouseover handler
    hiddenLines.on('mouseover', (skill) => this.selectModule(skill.name));
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
      this.props.selected,
      this.props.selectModule
    );
  }
  shouldComponentUpdate(props, state) {
    this.d3LanguageDisplay.update(props.language, props.selected);
    return false;
  }
  render() {
    return <div className='languageDisplay' ref={(el) => { this.div = el }} />
  }
}

