import React, { Component } from 'react';

const TalentDescription = (props) => {
  const name = props.skill.name == 'stdlib' ? 'standard library' : props.skill.name;
  const size = ['large', 'small', 'tiny'][Math.round(name.length / 16) - 1]
  return (
    <div className='talentDescription'>
      <span>{'You rank in the top'}</span>
      <span className='highlight'>{ Math.round(Math.max(0.001, props.skill.rank / props.skill.population) * 1000) / 10 + '%'}</span>
      <span>{'of'}</span>
      <span className={'highlight'}>{ Math.max(2, props.skill.population) }</span>
      <span>{'registered'}</span>
      <span className={size + ' highlight'}>{ name }</span>
      <span>{'developers'}</span>
    </div>
  );
}

export default TalentDescription;
