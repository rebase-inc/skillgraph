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
const WHITE = 'hsla(0, 0%, 85%, 1)';
const TRANSPARENT_WHITE = 'hsla(0, 0%, 85%, 0.25)';
const YELLOW = 'hsla(37, 89%, 52%, 1)';

export class SkillsChart {
  constructor(element, skills, options, selectLanguage) {
    this.options = options;
    let svg = d3.select(element).append('svg')
      .attr('width', options.width + options.margin.left + options.margin.right)
      .attr('height', options.height + options.margin.top + options.margin.bottom);
    let allLanguages = svg.append('g')
      .attr('transform', 'translate(' + options.margin.left + ',' + options.margin.top + ')')
      .datum(skills)
      .attr('data-name', data => data.name);

    this.languages = allLanguages.selectAll('g').data(d => d.technologies);
    this.languages.exit().remove();
    this.languages = this.languages.enter().append('g').merge(this.languages);
    this.languages.attr('data-name', data => data.name)
      .attr('opacity', 1)
      .on('click', language => selectLanguage(language.name));

    this.languages.append('text')
      .text(language => language.name)
      .attr('class', 'language')
      .attr('text-anchor', 'middle')
      .attr('x', function() {
        return SkillsChart.positionLabel(
          d3.select(this.parentNode), // language node
          d3.select(d3.select(this.parentNode).node().parentNode), // Languages node
          options.height,
          options.width
        ).x
      })
      .attr('y', (2 * DOT_RADIUS + DOT_SPACING) * GROUP_HEIGHT)
      .attr('font-size', FONT_SIZE)
      .attr('fill', WHITE)
      .attr('dy', FONT_SIZE + 4 * DOT_SPACING);

    this.placeholders = this.languages.selectAll('circle.placeholder')
      .data(language => _.range(Math.floor(DOTS_PER_GROUP * language.percentile), DOTS_PER_GROUP));
    this.placeholders.exit().remove();
    this.placeholders = this.placeholders.enter().append('circle').merge(this.placeholders)
      .attr('class', 'placeholder')
      .style('fill', TRANSPARENT_WHITE)
      .attr('r', DOT_RADIUS)
      .attr('stroke', 'transparent')
      .attr('stroke-width', 10); // terrible hack

    this.placeholders
      .attr('cx', function() {
        return SkillsChart.positionDot(
          this, // circle node
          d3.select('g[data-name="Languages"]'),
          options.height,
          options.width,
          false,
        ).cx
      })
      .attr('cy', function() {
        return SkillsChart.positionDot(
          this, // circle node
          d3.select('g[data-name="Languages"]'),
          options.height,
          options.width,
          false,
        ).cy
      })

    this.technologies = this.languages.selectAll('g').data(SkillsChart.stackTechnologies);
    this.technologies.exit().remove();
    this.technologies = this.technologies.enter().append('g').merge(this.technologies);
    this.technologies.attr('data-name', data => data.name)
      .style('fill', data => data.name ? WHITE : YELLOW)
      .on('mouseover', SkillsChart.highlightNode)
      .on('mouseout', SkillsChart.unhighlightNode);

    this.technologies.append('text')
      .text(technology => technology.name)
      .attr('class', 'technology')
      .attr('text-anchor', 'middle')
      .attr('x', function() {
        return SkillsChart.positionLabel(
          d3.select(this.parentNode), // technology node
          d3.select('g[data-name="Languages"]'),
          options.height,
          options.width
        ).x
      })
      .attr('y', (2 * DOT_RADIUS + DOT_SPACING) * GROUP_HEIGHT)
      .attr('font-size', FONT_SIZE)
      .attr('fill', 'none')
      .attr('dy', FONT_SIZE + 4 * DOT_SPACING);

    this.dots = this.technologies.selectAll('circle')
      .data(technology => _.range(0, Math.floor(DOTS_PER_GROUP * technology.percentile)));
    this.dots.exit().remove();
    this.dots = this.dots.enter().append('circle').merge(this.dots)
      .attr('r', DOT_RADIUS)
      .attr('stroke', 'transparent')
      .attr('stroke-width', 10); // terrible hack

    this.dots
      .attr('cx', function() {
        return SkillsChart.positionDot(
          this, // circle node
          d3.select('g[data-name="Languages"]'),
          options.height,
          options.width,
        ).cx
      })
      .attr('cy', function() {
        return SkillsChart.positionDot(
          this, // circle node
          d3.select('g[data-name="Languages"]'),
          options.height,
          options.width,
        ).cy
      })

  }
  static highlightNode() {
    d3.select(this).style('fill', YELLOW);
    d3.select(this.parentNode).select('.language').style('fill', 'none');
    d3.select(this).select('.technology').style('fill', YELLOW);
  }
  static unhighlightNode(node) {
    d3.select(this).style('fill', WHITE);
    d3.select(this.parentNode).select('.language').style('fill', WHITE);
    d3.select(this).select('text').style('fill', 'none');
  }
  // we're ignoring any updates to the skills for now
  update(skills, language) {
    let options = this.options; // need for inside bound functions below

    this.technologies
      .on('mouseover', language ? null : SkillsChart.highlightNode)
      .on('mouseout', language ? null : SkillsChart.unhighlightNode)
      .style('fill', WHITE);

    this.technologies.select('.technology').style('fill', language ? WHITE : 'none');

    this.languages.transition().duration(language ? 500 : 1600).delay(language ? 0 : 800)
      .style('opacity', function(data) {
        return (!language || data.name === language) ? 1 : 1e-6;
      });

    this.dots.transition().delay(d => (language ? 500 : 0) + Math.random() * 200).duration(800)
      .attr('cy', function() {
        return SkillsChart.positionDot(
          this, // circle node
          language ? d3.select('g[data-name="' + language + '"]') : d3.select('g[data-name="Languages"]'),
          options.height,
          options.width,
        ).cy
      })
      .attr('cx', function() {
        return SkillsChart.positionDot(
          this, // circle node
          language ? d3.select('g[data-name="' + language + '"]') : d3.select('g[data-name="Languages"]'),
          options.height,
          options.width,
        ).cx
      })

    this.technologies.selectAll('text')
      .attr('x', function() {
        return SkillsChart.positionLabel(
          d3.select(this.parentNode), // technology node
          language ? d3.select('g[data-name="' + language + '"]') : d3.select('g[data-name="Languages"]'),
          options.height,
          options.width
        ).x
      })
      .attr('fill', language ? WHITE : 'none')
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
  static positionDot(dotNode, displayedTechNode, height, width, wrap = true) {
    let skills = displayedTechNode.datum().technologies;
    let skill = d3.select(dotNode.parentNode);
    let parentSkill = d3.select(skill.node().parentNode);

    let stacked = (skills != parentSkill.datum().technologies);

    let [ start, end ] = (stacked ? [ skill.datum().start, skill.datum().end ] : [ 0, skill.datum().percentile ]).map(perc => Math.floor(perc * DOTS_PER_GROUP));
    let index = d3.select(dotNode).datum();
    if (wrap) { index %= (end - start); }

    let columnIndex = skills.indexOf(stacked ? parentSkill.datum() : skill.datum());
    let dotSpacing = 2 * DOT_RADIUS + DOT_SPACING;

    let cx = dotSpacing * ((start + index) % GROUP_WIDTH) + COLUMN_PIXELS * columnIndex + (width - (skills.length + 0.5)* COLUMN_PIXELS) / 2 + COLUMN_SPACING;
    let cy = dotSpacing * (GROUP_HEIGHT - Math.floor((start + index) / GROUP_WIDTH));
    return { cx, cy }
  }
  static positionLabel(techNode, displayedTechNode, height, width) {
    let skills = displayedTechNode.datum().technologies;
    let skill = techNode.datum();
    let parentSkill = d3.select(techNode.node().parentNode);
    if (parentSkill.attr('data-name') === null) {
      return { x: -100, y: height }
    }

    // TODO: Come up with more robust check to see if we're at the right depth
    if (displayedTechNode.attr('data-name') != parentSkill.attr('data-name')) {
      return SkillsChart.positionLabel(parentSkill, displayedTechNode, height, width);
    }
    let columnIndex = skills.indexOf(skill);
    let numColumns = skills.length;

    let offset = (width - numColumns * COLUMN_PIXELS) / 2;
    let x = COLUMN_PIXELS * columnIndex + offset + COLUMN_PIXELS / 2;
    let y = null;
    return { x, y }
  }
}
