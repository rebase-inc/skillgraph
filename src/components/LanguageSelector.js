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
      { previous ? <PreviousLanguage name={previous.name} select={props.select.bind(null, previous.name)} /> : null }
      <CurrentLanguage name={current.name} />
      { next ? <NextLanguage name={next.name} select={props.select.bind(null, next.name)} /> : null }
    </div>
  );
}

const CurrentLanguage = (props) => (
  <div className='current'>{props.name}</div>
);

const NextLanguage = (props) => (
  <div className='next' onClick={props.select}>
    { props.name }
  </div>
)

const PreviousLanguage = (props) => (
  <div className='previous' onClick={props.select}>
    { props.name }
  </div>
)

export default LanguageSelector;
