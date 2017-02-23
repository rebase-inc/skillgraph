import React, { Component } from 'react';
import LanguageIcon from './LanguageIcon';

const LanguageSelector = (props) => {
  const languages = props.languages.toArray();
  return (
    <div className='languageSelector'>
      { languages.map(lang => <LanguageSelection name={lang.name} select={props.select.bind(null, lang.name)} selected={props.selected} />) }
    </div>
  );
}

const LanguageSelection = (props) => (
  <div className='languageSelection' onClick={props.select} data-selected={props.selected.name == props.name}>
    { props.name }
  </div>
);


const Arrow = (props) => {
  const transform = props.left ? 'translate(25,0)rotate(90)' : 'translate(0,45)rotate(-90)';
  return (
    <svg width="8px" height="12px" viewBox="0 0 25 45" className='arrow'>
      <g fillRule="evenodd" transform={transform}>
        <path d="M21.5859,24.1973 C21.9609,24.5723 22.4699,24.7833 22.9999,24.7833 C23.5299,24.7833 24.0389,24.5723 24.4139,24.1973 L44.5879,4.0223 C45.3689,3.2413 45.3689,1.9753 44.5879,1.1943 C43.8069,0.4133 42.5399,0.4133 41.7599,1.1943 L22.9999,19.9553 L4.2399,1.1943 C3.4599,0.4133 2.1929,0.4133 1.4119,1.1943 C0.6309,1.9753 0.6309,3.2413 1.4119,4.0223 L21.5859,24.1973 Z" id="Fill-591"></path>
      </g>
    </svg>
  )
}

export default LanguageSelector;
