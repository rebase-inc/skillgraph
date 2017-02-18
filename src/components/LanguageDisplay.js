import * as d3 from 'd3';
import React, { Component } from 'react';

const REMOVE_DURATION = (oldSkills, newSkills) => 300;
const REMOVE_DELAY = (oldSkills, newSkills) => 0;
const MOVE_DURATION = (oldSkills, newSkills) => 300;
const MOVE_DELAY = (oldSkills, newSkills) => oldSkills.length > newSkills.length ? 300 : 0;

const TWEETER_PATH = "M13.0577,25.63515 C21.0766,25.63515 25.4626,18.99155 25.4626,13.23025 C25.4626,13.04155 25.4626,12.8537 25.44985,12.6667 C26.3031067,12.0495242 27.0396522,11.2853475 27.625,10.40995 C26.8292972,10.7625315 25.9852049,10.9937544 25.1209,11.0959 C26.0310324,10.5510347 26.712205,9.69405619 27.03765,8.68445 C26.1818339,9.19228702 25.2455492,9.55018522 24.2692,9.7427 C22.9177704,8.30568514 20.7703615,7.9539707 19.0311169,8.88477794 C17.2918723,9.81558518 16.3933337,11.7974269 16.83935,13.719 C13.3338614,13.5432621 10.0678044,11.8875248 7.854,9.16385 C6.69682934,11.155948 7.2878897,13.7044306 9.2038,14.9838 C8.50998002,14.9632364 7.83128747,14.7760712 7.225,14.4381 L7.225,14.49335 C7.22556791,16.568704 8.68848876,18.3562049 10.72275,18.76715 C10.0808892,18.942199 9.4074435,18.9677877 8.75415,18.84195 C9.32530574,20.6179594 10.9620884,21.8346163 12.82735,21.86965 C11.2835248,23.0829672 9.37640058,23.7416286 7.41285,23.73965 C7.06596803,23.7389841 6.71942346,23.7179814 6.375,23.67675 C8.36879056,24.9562351 10.6886764,25.6349094 13.0577,25.63175";

class D3LanguageDisplay {
  constructor(parentElement, modules, selected, onHover, options) {
    this.width = options ? options.width || 700 : 700;
    this.height = options ? options.height || 400 : 400;
    this.max_bars = options ? options.max_bars || 21 : 21;
    this.labelSize = options ? options.labelSize || 16 : 16;
    this.headerSize = options ? options.headerSize || 48 : 48;
    this.margins = Object.assign({top: 0, bottom: 40, left: 40, right: 20}, options ? options.margins || {} : {});
    this.svg = d3.select(parentElement).append('svg')
      .attr('overflow', 'visible')
      .attr('viewBox', '0 0 ' + (this.width + this.margins.left + this.margins.right) + ' ' + (this.height + this.headerSize + this.margins.top + this.margins.bottom))
      .attr('preserveAspectRatio', 'xMidYMid')
      .attr('width', this.width + this.margins.left + this.margins.right)
      .attr('height', this.height + this.margins.top + this.margins.bottom + this.headerSize);
    this.header = this.svg.append('g').attr('class', 'header').attr('transform', 'translate(' + this.margins.left + ',0)');
    this.svg = this.svg.append('g')
      .attr('transform', 'translate(' + this.margins.left + ',' + (this.headerSize + this.margins.top) + ')');
    let rank = this.header.append('g').attr('class', 'headerRank');
    let population = this.header.append('g').attr('class', 'headerPopulation')
    rank.append('text').text('rank')
      .attr('font-size', 0.30 * this.headerSize)
      .attr('x', this.width - 2 * this.headerSize)
      .attr('y', 0)
      .attr('text-anchor', 'end');
    population.append('text').text('population')
      .attr('font-size', 0.30 * this.headerSize)
      .attr('x', this.width)
      .attr('y', 0)
      .attr('text-anchor', 'end');
    this.rank = rank.append('text')
      .attr('class', 'headerValue')
      .attr('font-size', 0.70 * this.headerSize)
      .attr('x', this.width - 2 * this.headerSize)
      .attr('y', 0.7 * this.headerSize)
      .attr('text-anchor', 'end');
    this.population = population.append('text')
      .attr('class', 'headerValue')
      .attr('font-size', 0.70 * this.headerSize)
      .attr('x', this.width)
      .attr('y', 0.7 * this.headerSize)
      .attr('text-anchor', 'end');
    this.onHover = onHover;
    this.update(modules, selected);
  }
  calculateBarHeight(module, maxRelevance) {
    return this.height * Math.max(0.01, Math.min(1.0, 0.9 * module.relevance / maxRelevance));
  }
  update(data, selected) {
    data = data.sort((a, b) => b.relevance - a.relevance).toArray().slice(0, this.max_bars);
    let maxRelevance = Math.max(...data.filter((d) => d.name != 'stdlib').map((d) => d.relevance), 1);
    let barWidth = this.width / (2 * data.length - 1);

    let previousData = this.svg.selectAll('.module').data();
    let modules = this.svg.selectAll('.module').data(data);

    modules.exit().selectAll('line')
      .transition().duration(REMOVE_DURATION).delay(REMOVE_DELAY)
      .attr('y1', this.height).attr('y2', this.height);

    modules.exit().transition().duration(REMOVE_DURATION).delay(REMOVE_DELAY).remove();

    this.rank.text(selected ? selected.rank + 1 : '');
    this.population.text(selected ? selected.population : '');

    let newModules = modules.enter().append('g').attr('class', 'module');
    let populations = newModules.append('line').attr('class', 'population')
      .attr('x1', this.width).attr('x2', this.width).attr('y1', this.height).attr('y2', this.height)
      .merge(modules.select('.population'));
    let rankings = newModules.append('line').attr('class', 'ranking')
      .attr('x1', this.width).attr('x2', this.width).attr('y1', this.height).attr('y2', this.height)
      .merge(modules.select('.ranking'));
    let selectors = newModules.append('line').attr('class', 'selector')
      .attr('x1', this.width).attr('x2', this.width).attr('y1', this.height).attr('y2', this.height)
      .merge(modules.select('.selector'));
    let text = newModules.append('text')
      .attr('x', this.width).attr('y', this.height)
      .attr('text-anchor', 'end')
      .attr('font-size', this.labelSize)
      .merge(modules.select('text'))
      .text((module) => module.name);
    let tweeters = newModules.append('g').attr('class', 'tweeter');
    tweeters.append('path').attr('d', TWEETER_PATH);
    tweeters.append('rect').attr('x', 0).attr('y', 10).attr('width', this.width / data.length).attr('height', 30).attr('fill', 'transparent');
    tweeters = tweeters.merge(modules.select('.tweeter'));
    modules = modules.merge(newModules).attr('data-module', (module) => module.name);
    modules.attr('data-selected', module => selected && module.name == selected.name);

    let moveDelay = MOVE_DELAY(previousData, data);
    let moveDuration = MOVE_DURATION(previousData, data);

    populations.transition().delay(moveDelay).duration(moveDuration)
      .attr('x1', (module, index) => (2 * index + 0.5) * barWidth)
      .attr('x2', (module, index) => (2 * index + 0.5) * barWidth)
      .attr('y1', this.height)
      .attr('y2', (module) => this.height - this.calculateBarHeight(module, maxRelevance))
      .attr('stroke-width', barWidth);

    rankings.transition().delay(moveDelay).duration(moveDuration)
      .attr('x1', (module, index) => (2 * index + 0.5) * barWidth)
      .attr('x2', (module, index) => (2 * index + 0.5) * barWidth)
      .attr('y1', (module) => this.height)
      .attr('y2', (module) => this.height - (1 - module.rank / module.population) * this.calculateBarHeight(module, maxRelevance))
      .attr('stroke-width', barWidth);

    selectors.transition().delay(moveDelay).duration(moveDuration)
      .attr('x1', (module, index) => (2 * index + 0.5) * barWidth)
      .attr('x2', (module, index) => (2 * index + 0.5) * barWidth)
      .attr('y1', this.height)
      .attr('y2', 0)
      .attr('stroke-width', this.width / data.length);

    text.transition().delay(moveDelay).duration(moveDuration)
      .attr('x', (module, index) => (2 * index + 0.5) * barWidth)
      .attr('y', this.height)
      .attr('transform', (m, i) => {
        const rotate = 'rotate(-45,' + (2 * i + 0.5) * barWidth + ',' + this.height + ')';
        const shift = 'translate(' + -0.5 * this.labelSize + ',' + 0.8 * this.labelSize + ')';
        return rotate + shift;
      });

    tweeters.transition().delay(moveDelay).duration(moveDuration)
      .attr('transform', (mod, ind) => {
        const x = (2 * ind + 0.5) * barWidth - 16;
        const y = this.height - this.calculateBarHeight(mod, maxRelevance) - 40;
        return 'translate(' + x + ',' + y + ')'
      });

    let elasticEase = d3.easeElastic.period(0.5);
    modules.attr('pointer-events', 'none');
    modules.on('mouseover', (module) => this.onHover(module.name));
    tweeters
      .on('mouseover', function() {
        d3.select(this).select('path').transition()
          .duration(300)
          .ease(elasticEase)
          .attr('transform', 'translate(-3.2, -8) scale(1.2)');
      })
      .on('mouseout', function() {
        d3.select(this).select('path').transition()
          .duration(300)
          .ease(elasticEase)
          .attr('transform', '');
      });
    modules.transition().delay(moveDelay).duration(moveDuration).attr('pointer-events', '');

    return;
  }
}

export default class LanguageDisplay extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount() {
    this.d3LanguageDisplay = new D3LanguageDisplay(
      this.div,
      this.props.modules,
      this.props.selected,
      this.props.onHover
    );
  }
  shouldComponentUpdate(props, state) {
    this.d3LanguageDisplay.update(props.modules, props.selected);
    return false;
  }
  render() {
    return <div className='languageDisplay' ref={(el) => { this.div = el }} />
  }
}

