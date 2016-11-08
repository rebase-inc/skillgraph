import React, { Component } from 'react';

import LanguageDisplay from './LanguageDisplay';

import SKILLS from './mock/skills';

function arcPercentageToCartesian(cx, cy, r, percent) {
  var angle = percent * 2 * Math.PI;
  return {
    x: cx + (r * Math.cos(angle)),
    y: cy + (r * Math.sin(angle))
  };
}

function describeArc(cx, cy, r, startPercentage, endPercentage){
  var start = arcPercentageToCartesian(cx, cy, r, endPercentage);
  var end = arcPercentageToCartesian(cx, cy, r, startPercentage);
  var largeArcFlag = Math.abs(endPercentage - startPercentage) <= 0.5 ? '0' : '1';
  return ['M', start.x, start.y, 'A', r, r, 0, largeArcFlag, 0, end.x, end.y ].join(' ');
}

class SkillsGraph extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { 
      language: SKILLS.childSkills.first(),
      technology: null,
    };
  }
  render() {
    const { technology, language } = this.state;
    return (
      <div className='layout'>
        <TalentDescription technology={technology || language} />
        <LanguageSelector languages={SKILLS.childSkills} selected={language} select={(value) => this.setState({ language: value, technology: null })} />
        <LanguageDisplay language={language} technology={technology} selectTechnology={(value) => this.setState({ technology: value })} />
      </div>
    );
  }
}

const TalentDescription = (props) => (
  <div className='talentDescription'>
    <span>{'You rank above'}</span>
    <span className='highlight'>{ Math.round(props.technology.rank * 100) + '%'}</span>
    <span>{'of'}</span>
    <span className={props.technology.name.length >= 16 ? 'small highlight' : 'highlight'}>{ props.technology.name }</span>
    <span>{'developers'}</span>
  </div>
);

const LanguageSelector = (props) => (
  <div className='languageSelector'>
    { props.languages.map(language => <LanguageSelection language={language} selected={props.selected == language} select={props.select} /> ) }
  </div>
);

const LanguageSelection = (props) => (
  <span className='languageSelection' data-selected={props.selected} onMouseOver={props.select.bind(null, props.language)}>
    <img src={'src/img/' + props.language.name.toLowerCase() + '.svg'} />
    { props.language.name } 
  </span>
);


const TechnologyLine = (props) => (
  <g onMouseOver={props.select.bind(null, props.tech)} onMouseOut={props.select.bind(null, null)} >
    <line stroke='transparent' strokeWidth='8' x1={0} x2={600} y1={props.y} y2={props.y} />
    <line 
      stroke={props.selected ? '#EA9600' : '#E3E5EA'} 
      strokeWidth={props.selected ? 3 : 3} 
      x1={0} 
      x2={Math.max(props.tech.rank * props.tech.impact * props.widthPerUnitImpact, 3)} 
      y1={props.y} 
      y2={props.y} />
    <line 
      opacity={0.35}
      stroke={props.selected ? '#EA9600' : '#E3E5EA'} 
      strokeWidth={props.selected ? 3 : 3} 
      x1={0} 
      x2={Math.max(props.tech.impact * props.widthPerUnitImpact, 3)}
      y1={props.y} 
      y2={props.y} />
  </g>
);
export default SkillsGraph;
