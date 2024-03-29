import * as d3 from 'd3';
import _ from 'lodash';

const GROUP_WIDTH = 1;
const GROUP_HEIGHT = 60;
const DOT_RADIUS = 2;
const DOT_SPACING = 3;

const COLUMN_SPACING = 10;
// const FONT_SIZE = 10;
const COLUMN_PIXELS = COLUMN_SPACING + GROUP_WIDTH * (2 * DOT_RADIUS + DOT_SPACING) - DOT_SPACING; // for convenience
const DOTS_PER_GROUP = GROUP_WIDTH * GROUP_HEIGHT;
const WHITE = 'hsla(0, 0%, 85%, 1)';
// const TRANSPARENT_WHITE = 'hsla(0, 0%, 85%, 0.25)';
const YELLOW = 'hsla(37, 89%, 52%, 1)';

export class SkillsChart {
  constructor(element, skillTree, options, selectSkill, displaySkill) {
    
    this.skillTree = skillTree; // tree of Skill Records
    this.selected = []; // keypath
    
    this.options = options;
    this.selectSkill = selectSkill;
    this.displaySkill = displaySkill;

    const { height, width, margin } = this.options;
    this.svg = d3.select(element).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('class', 'mainGroup')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    this.constructSkillTree();
  }
  update(selectedSkill) {
    this.selected = selectedSkill || []; 
    this.constructSkillTree();
  }
  constructSkillTree() {
    let data = this.selected.reduce((skill, name) => skill.childSkills.find(s => s.name == name), this.skillTree).childSkills;
    data = data.sort((a,b) => b.rank - a.rank).toJS().map(this._makeSkillDots)
    data = data.reduce((allDots, skillDots) => allDots.concat(skillDots), []);
    let dots = this.svg.selectAll('circle').data(data);
    dots.exit().remove();
    dots = dots.enter().append('circle').merge(dots);
    dots.attr('data-skill', skill => skill.name)
      .attr('fill', WHITE)
      .attr('r', DOT_RADIUS)
      .attr('stroke', 'transparent')
      .attr('stroke-width', 10)
      .transition().duration(3000)
      .attr('cx', data => data.cx)
      .attr('cy', data => data.cy);
    this.svg.on('click', data => this.selectSkill(this.selected.concat(['JavaScript'])));
    // dots.on('mouseover', data => this.displaySkill(data));
    // dots.on('mouseout', data => this.displaySkill({ name: '', rank: 0 }));
    return;
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
  _makeSkillDots(skill, column) {
    let size = Math.ceil(DOTS_PER_GROUP * skill.rank);
    return _.range(0, size).map(index => {
      return {
        name: skill.name,
        rank: skill.rank,
        cx: (DOT_SPACING + 2 * DOT_RADIUS) * (index % GROUP_WIDTH) + column * COLUMN_PIXELS,
        cy: (DOT_SPACING + 2 * DOT_RADIUS) * (GROUP_HEIGHT - Math.floor(index / GROUP_WIDTH)),
      }
    });
  }
}

// export class dSkillsChart {
//   constructor(element, skills, options, selectSkill) {
//     this.options = options;
//     let svg = d3.select(element).append('svg')
//       .attr('width', options.width + options.margin.left + options.margin.right)
//       .attr('height', options.height + options.margin.top + options.margin.bottom);
//     this.mainGroup = svg.append('g')
//       .attr('transform', 'translate(' + options.margin.left + ',' + options.margin.top + ')')
//       .datum(skills)
//       .attr('data-name', data => data.name);

//     this.makeLanguages(selectSkill); // TODO: would be nice to make this a recursive function
//     this.makePlaceholders(this.languages); // This is horrible, I'm sorry.
//     this.makeTechnologies();
//     this.makeDots();
//   }
//   static highlightNode() {
//     d3.select(this).style('fill', YELLOW);
//     d3.select(this.parentNode).select('.language').style('fill', 'none');
//     d3.select(this).select('.skill').style('fill', YELLOW);
//   }
//   static unhighlightNode(node) {
//     d3.select(this).style('fill', WHITE);
//     d3.select(this.parentNode).select('.language').style('fill', WHITE);
//     d3.select(this).select('text').style('fill', 'none');
//   }
//   makeDots() {
//     const { options } = this;
//     this.dots = this.technologies.selectAll('circle')
//       .data(skill => _.range(0, Math.floor(DOTS_PER_GROUP * skill.percentile)));
//     this.dots.exit().remove();
//     this.dots = this.dots.enter().append('circle').merge(this.dots)
//       .attr('r', DOT_RADIUS)
//       .attr('stroke', 'transparent')
//       .attr('stroke-width', 10); // terrible hack

//     this.dots
//       .attr('cx', function() {
//         return SkillsChart.positionDot(
//           this, // circle node
//           d3.select('g[data-name="Languages"]'),
//           options.height,
//           options.width,
//         ).cx
//       })
//       .attr('cy', function() {
//         return SkillsChart.positionDot(
//           this, // circle node
//           d3.select('g[data-name="Languages"]'),
//           options.height,
//           options.width,
//         ).cy
//       })

//   }
//   // we're ignoring any updates to the skills for now
//   update(skills, language) {
//     let options = this.options; // need for inside bound functions below

//     this.makePlaceholders(language ? d3.select('g[data-name="' + language + '"]') : d3.select('g[data-name="Languages"]'));

//     this.technologies
//       .on('mouseover', language ? null : SkillsChart.highlightNode)
//       .on('mouseout', language ? null : SkillsChart.unhighlightNode)
//       .style('fill', WHITE);

//     this.technologies.select('.technology').style('fill', language ? WHITE : 'none');

//     this.languages.transition().duration(language ? 500 : 1600).delay(language ? 0 : 800)
//       .style('opacity', function(data) {
//         return (!language || data.name === language) ? 1 : 1e-6;
//       });

//     this.dots.transition().delay(d => (language ? 500 : 0) + Math.random() * 200).duration(800)
//       .attr('cy', function() {
//         return SkillsChart.positionDot(
//           this, // circle node
//           language ? d3.select('g[data-name="' + language + '"]') : d3.select('g[data-name="Languages"]'),
//           options.height,
//           options.width,
//         ).cy
//       })
//       .attr('cx', function() {
//         return SkillsChart.positionDot(
//           this, // circle node
//           language ? d3.select('g[data-name="' + language + '"]') : d3.select('g[data-name="Languages"]'),
//           options.height,
//           options.width,
//         ).cx
//       })

//     this.technologies.selectAll('text')
//       .attr('x', function() {
//         return SkillsChart.positionLabel(
//           d3.select(this.parentNode), // technology node
//           language ? d3.select('g[data-name="' + language + '"]') : d3.select('g[data-name="Languages"]'),
//           options.height,
//           options.width
//         ).x
//       })
//       .attr('fill', language ? WHITE : 'none')
//   }
//   stackTechnologies(technology) {
//     let percentageSoFar = 0.0;
//     let allTech = technology;
//     let sumOfChildren = technology.technologies.reduce((sum, tech) => sum + tech.percentile, 0) || 1;
//     technology.technologies.forEach((child, index) => {
//       child.contribution = technology.percentile * child.percentile / sumOfChildren;
//       child.stackedPosition = percentageSoFar;
//       child.name = technology.name + '.' + child.name;
//       percentageSoFar += child.contribution;
//       allTech.technologies[index] = this.stackTechnologies(child);
//     });
//     return allTech;
//   }
//   static positionDot(dotNode, displayedTechNode, height, width, wrap = true) {
//     let skills = displayedTechNode.datum().technologies;
//     let skill = d3.select(dotNode.parentNode);
//     let parentSkill = d3.select(skill.node().parentNode);

//     let stacked = (skills !== parentSkill.datum().technologies);

//     let [ start, end ] = (stacked ? [ skill.datum().start, skill.datum().end ] : [ 0, skill.datum().percentile ]).map(perc => Math.floor(perc * DOTS_PER_GROUP));
//     let index = d3.select(dotNode).datum();
//     if (wrap) { index %= (end - start); }

//     let columnIndex = skills.indexOf(stacked ? parentSkill.datum() : skill.datum());
//     let dotSpacing = 2 * DOT_RADIUS + DOT_SPACING;

//     let cx = dotSpacing * ((start + index) % GROUP_WIDTH) + COLUMN_PIXELS * columnIndex + (width - (skills.length + 0.5)* COLUMN_PIXELS) / 2 + COLUMN_SPACING;
//     let cy = dotSpacing * (GROUP_HEIGHT - Math.floor((start + index) / GROUP_WIDTH));
//     return { cx, cy }
//   }
//   static positionLabel(techNode, displayedTechNode, height, width) {
//     let skills = displayedTechNode.datum().technologies;
//     let skill = techNode.datum();
//     let parentSkill = d3.select(techNode.node().parentNode);
//     if (parentSkill.attr('data-name') === null) {
//       return { x: -100, y: height }
//     }

//     // TODO: Come up with more robust check to see if we're at the right depth
//     if (displayedTechNode.attr('data-name') !== parentSkill.attr('data-name')) {
//       return SkillsChart.positionLabel(parentSkill, displayedTechNode, height, width);
//     }
//     let columnIndex = skills.indexOf(skill);
//     let numColumns = skills.length;

//     let offset = (width - numColumns * COLUMN_PIXELS) / 2;
//     let x = COLUMN_PIXELS * columnIndex + offset + COLUMN_PIXELS / 2;
//     let y = null;
//     return { x, y }
//   }
// }
