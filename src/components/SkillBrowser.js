import React, { Component } from 'react';

import LanguageDisplay from './LanguageDisplay';
import LanguageSelector from './LanguageSelector';
import TalentDescription from './TalentDescription';

class SkillsGraph extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { 
      language: props.skills.find(SkillsGraph.isLanguage), 
      technology: null,
    };
  }
  static isLanguage(skill) {
    return skill.name !== '_overall' && skill.name.split('.').length === 1;
  }
  static isTechnology(language, skill) {
    return skill.name.startsWith(language.name) && skill.name !== language.name;
  }
  render() {
    const { technology, language } = this.state;
    const languages = this.props.skills.filter(SkillsGraph.isLanguage);
    const technologies = this.props.skills.filter(SkillsGraph.isTechnology.bind(null, language));
    return (
      <div className='skillBrowser'>
        <TalentDescription technology={technology || language} />
        <LanguageSelector languages={languages} selected={language} select={(value) => this.setState({ language: value, technology: null })} />
        <LanguageDisplay technologies={technologies} technology={technology} selectTechnology={(value) => this.setState({ technology: value })} />
      </div>
    );
  }
}

export default SkillsGraph;
