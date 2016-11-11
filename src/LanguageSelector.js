import React, { Component } from 'react';

const LanguageSelector = (props) => (
  <div className='languageSelector'>
    { props.languages.map(language => <LanguageSelection language={language} selected={props.selected == language} select={props.select} /> ) }
  </div>
);

const LanguageSelection = (props) => (
  <span className='languageSelection' data-selected={props.selected} onMouseOver={props.select.bind(null, props.language)}>
    {/* <img src={'src/img/' + props.language.name.toLowerCase() + '.svg'} /> */}
    { props.language.name } 
  </span>
);

export default LanguageSelector;
