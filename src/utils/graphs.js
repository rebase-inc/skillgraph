import * as d3 from 'd3';
import _ from 'lodash';

const GROUP_WIDTH = 6;
const GROUP_HEIGHT = 60;
const DOT_RADIUS = 1.8;
const DOT_SPACING = 3;
const COLUMN_SPACING = 45;
const FONT_SIZE = 10;
const COLUMN_PIXELS = COLUMN_SPACING + GROUP_WIDTH * (2 * DOT_RADIUS + DOT_SPACING) - DOT_SPACING; // for convenience
const DOTS_PER_GROUP = GROUP_WIDTH * GROUP_HEIGHT;

export class SkillsChart {
  constructor(element, skills, options, selectLanguage) {
    this.options = options;
    let svg = d3.select(element).append('svg')
      .attr('width', options.width + options.margin.left + options.margin.right)
      .attr('height', options.height + options.margin.top + options.margin.bottom);
    this.mainGroup = svg.append('g')
      .attr('transform', 'translate(' + options.margin.left + ',' + options.margin.top + ')')
      .datum({ language: null });

    this.languages = this.mainGroup.selectAll('g').data(skills);
    this.languages.exit().remove();
    this.languages = this.languages.enter().append('g').merge(this.languages);
    this.languages.attr('data-name', data => data.name)
      .attr('opacity', 1)
      .on('click', language => selectLanguage(language.name));

    this.languages.append('text')
      .text(language => language.name)
      .attr('class', 'language')
      .attr('text-anchor', 'middle')
      .attr('x', (COLUMN_PIXELS - COLUMN_SPACING) / 2)
      .attr('y', (2 * DOT_RADIUS + DOT_SPACING) * GROUP_HEIGHT)
      .attr('font-size', FONT_SIZE)
      .attr('fill', 'hsla(0, 0%, 85%, 1)')
      .attr('dy', FONT_SIZE + 4 * DOT_SPACING)

    this.technologies = this.languages.selectAll('g').data(SkillsChart.stackTechnologies);
    this.technologies.exit().remove();
    this.technologies = this.technologies.enter().append('g').merge(this.technologies);
    this.technologies.attr('data-name', data => data.name)
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

    this.technologies.append('text')
      .text(technology => technology.name)
      .attr('class', 'technology')
      .attr('text-anchor', 'middle')
      .attr('x', (COLUMN_PIXELS - COLUMN_SPACING) / 2)
      .attr('y', (2 * DOT_RADIUS + DOT_SPACING) * GROUP_HEIGHT)
      .attr('font-size', FONT_SIZE)
      .attr('fill', 'none')
      .attr('dy', FONT_SIZE + 4 * DOT_SPACING);

    this.dots = this.technologies.selectAll('circle')
      .data(technology => _.range(0, Math.floor(DOTS_PER_GROUP * technology.percentile)));
    this.dots.exit().remove();
    this.dots = this.dots.enter().append('circle').merge(this.dots);
    this.dots.attr('r', DOT_RADIUS)
      .attr('cx', function(dotIndex) {
        let technologyNode = d3.select(this.parentNode);
        let technology = technologyNode.datum();
        let start = technology.start;
        let end = technology.end;
        let column = skills.map(s => s.name).indexOf(d3.select(technologyNode.node().parentNode).datum().name);
        let numColumns = skills.length;
        return SkillsChart.positionDot(start, end, dotIndex, column, numColumns).x
      })
      .attr('cy', function(dotIndex) {
        let technologyNode = d3.select(this.parentNode);
        let technology = technologyNode.datum();
        let start = technology.start;
        let end = technology.end;
        let column = skills.map(s => s.name).indexOf(d3.select(technologyNode.node().parentNode).datum().name);
        let numColumns = skills.length;
        return SkillsChart.positionDot(start, end, dotIndex, column, numColumns).y
      })
      .attr('stroke', 'transparent')
      .attr('stroke-width', 10); // terrible hack
  }
  // we're ignoring any updates to the skills for now
  update(skills, language) {
    let options = this.options; // need for inside bound functions below
    //this.languages.transition().duration(00)
    // .attr('opacity', data => !language || language == data.name ? 1 : 0);
    this.languages.transition().duration(language ? 800 : 1600).delay(language ? 0 : 800)
      .style('opacity', function(data) {
        return (!language || data.name == language) ? 1 : 1e-6;
      });

    this.dots.transition().delay(d => (language ? 500 : 0) + Math.random() * 200).duration(800)
      .attr('cx', function(dot, dotIndex) {
        let technologyNode = d3.select(this.parentNode);
        let languageNode = d3.select(technologyNode.node().parentNode);
        if (language && languageNode.datum().name != language) { return 0; }
        let technology = technologyNode.datum();
        let start = language ? 0 : technology.start;
        let end = language ? technology.percentile : technology.end;
        let data = language ? languageNode.datum().technologies : skills;
        let name = language ? technology.name : languageNode.datum().name;
        let column = data.map(d => d.name).indexOf(name);
        let numColumns = data.length;
        return SkillsChart.positionDot(start, end, dotIndex, column, numColumns).x
      })
      .attr('cy', function(dot, dotIndex) {
        let technologyNode = d3.select(this.parentNode);
        let languageNode = d3.select(technologyNode.node().parentNode);
        if (language && languageNode.datum().name != language) { return options.height }
        let technology = technologyNode.datum();
        let start = language ? 0 : technology.start;
        let end = language ? technology.percentile : technology.end;
        let data = language ? languageNode.datum().technologies : skills;
        let name = language ? technology.name : languageNode.datum().name;
        let column = data.map(d => d.name).indexOf(name);
        let numColumns = data.length;
        return SkillsChart.positionDot(start, end, dotIndex, column, numColumns).y
      });
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
  static positionDot(startPercentile, endPercentile, dotIndex, columnIndex, numColumns) {
    let startDot = Math.floor(startPercentile * DOTS_PER_GROUP);
    let endDot = Math.floor(endPercentile * DOTS_PER_GROUP);
    let spacing = 2 * DOT_RADIUS + DOT_SPACING;

    dotIndex %= (endDot - startDot);

    let x = spacing * ((startDot + dotIndex) % GROUP_WIDTH) + COLUMN_PIXELS * columnIndex;
    let y = spacing * (GROUP_HEIGHT - Math.floor((startDot + dotIndex) / GROUP_WIDTH));
    return { x, y }
  }
}
