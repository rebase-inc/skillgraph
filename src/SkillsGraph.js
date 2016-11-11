import React, { Component } from 'react';

import LanguageDisplay from './LanguageDisplay';
import LanguageSelector from './LanguageSelector';
import TalentDescription from './TalentDescription';

import SKILLS from './mock/skills';

class SkillsGraph extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { 
      language: SKILLS.childSkills.first(),
      technology: null,
    };
  }
  render() {
    const { technology, language } = this.state;
    return (
      <div className='layout'>
        <TalentDescription technology={technology || language} />
        <LanguageSelector languages={SKILLS.childSkills} selected={language} select={(value) => this.setState({ language: value, technology: null })} />
        <LanguageDisplay language={language} technology={technology} selectTechnology={(value) => this.setState({ technology: value })} />
      </div>
    );
  }
}

export default SkillsGraph;
