import React, { Component } from 'react';

import LanguageDisplay from './LanguageDisplay';
import LanguageSelector from './LanguageSelector';
import ModuleDescription from './ModuleDescription';
import TalentDescription from './TalentDescription';

class SkillsBrowser extends Component {
  render() {
    const { language, module } = this.state;
    const { languages } = this.props;
    const modules = language.modules.map(name => this.props.modules.get(name));
    return (
      <div className='skillBrowser'>
        <LanguageSelector languages={languages} selected={language} select={this.selectLanguage} />
        <LanguageDisplay modules={modules} onHover={this.selectModule} selected={module} />
      </div>
    );
  }
}

export default SkillsBrowser;
