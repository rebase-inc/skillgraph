import React, { Component } from 'react';

const TalentDescription = (props) => {
  const size = ['large', 'small', 'tiny'][Math.round(props.skill.name.length / 16) - 1]
  return (
    <div className='talentDescription'>
      <span>{'You rank in the top'}</span>
      <span className='highlight'>{ Math.round(props.skill.percentile * 1000) / 10 + '%'}</span>
      <span>{'of'}</span>
      <span className={size + ' highlight'}>{ props.skill.name }</span>
      <span>{'developers'}</span>
    </div>
  );
}

export default TalentDescription;
