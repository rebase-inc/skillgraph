import React, { Component } from 'react';
import LanguageIcon from './LanguageIcon';

const LanguageSelector = (props) => {
  const languages = props.languages.toArray();
  const currentIndex = languages.findIndex(lang => lang.name == props.selected.name);
  const previous = languages[currentIndex - 1] || null;
  const current = languages[currentIndex];
  const next = languages[currentIndex + 1] || null;
  return ( 
    <div className='languageSelector'>
      { previous ? <div className='previous' onClick={() => props.select(previous.name)}>{ previous.name }</div> : null }
      <div className='current'>{current.name}</div>
      { next ? <div className='next' onClick={() => props.select(next.name)}>{ next.name }</div> : null }
    </div>
  );
}

export default LanguageSelector;
