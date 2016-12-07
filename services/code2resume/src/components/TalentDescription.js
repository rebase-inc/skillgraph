import React, { Component } from 'react';

const TalentDescription = (props) => {
  const name = props.technology.name.replace('.3rd-party.', ' ').replace('.language', ' language');
  const size = ['large', 'small', 'tiny'][Math.round(name.length / 16) - 1]
  return (
    <div className='talentDescription'>
      <span>{'You rank above'}</span>
      <span className='highlight'>{ Math.round(props.technology.rank * 100) + '%'}</span>
      <span>{'of'}</span>
      <span className={size + ' highlight'}>{ name }</span>
      <span>{'developers'}</span>
    </div>
  );
}

export default TalentDescription;
