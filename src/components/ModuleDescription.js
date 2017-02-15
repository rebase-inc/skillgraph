import React, { Component } from 'react';

const TalentDescription = (props) => {
  return (
    <div className='moduleDescription'>
      <div>{ 'Rank: ' + props.module.rank }</div>
      <div>{'Population: ' + props.module.population }</div>
    </div>
  );
}

export default TalentDescription;
