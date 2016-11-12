import React, { Component } from 'react';

const TalentDescription = (props) => (
  <div className='talentDescription'>
    <span>{'You rank above'}</span>
    <span className='highlight'>{ Math.round(props.technology.rank * 100) + '%'}</span>
    <span>{'of'}</span>
    <span className={props.technology.name.length >= 16 ? 'small highlight' : 'highlight'}>{ props.technology.name }</span>
    <span>{'developers'}</span>
  </div>
);

export default TalentDescription;
