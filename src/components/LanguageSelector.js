import React, { Component } from 'react';
import LanguageIcon from './LanguageIcon';

const LanguageSelector = (props) => (
  <div className='languageSelector'>
    { props.languages.map(language => <LanguageSelection name={language.name} selected={props.selected.name == language.name} select={props.select.bind(null, language.name)} /> ) }
  </div>
);

const LanguageSelection = (props) => (
  <span className='languageSelection' data-selected={props.selected} onMouseOver={props.select}>
    <LanguageIcon name={props.name} />
    { props.name }
  </span>
);

export default LanguageSelector;
