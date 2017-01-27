import React, { Component } from 'react';

import LanguageDisplay from './LanguageDisplay';
import LanguageSelector from './LanguageSelector';
import TalentDescription from './TalentDescription';

class SkillsBrowser extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      language: props.languages.first(),
      module: null,
    };
    this.selectLanguage = this.selectLanguage.bind(this);
    this.selectModule = this.selectModule.bind(this);
  }
  selectLanguage(name) {
    this.setState({
      language: this.props.languages.get(name),
      module: null
    });
  }
  selectModule(name) {
    console.log('trying to select', name);
    this.setState({
      module: !!name ? this.state.language.get(name) || this.state.language.modules.get(name) : null,
    });
  }
  render() {
    const { language, module } = this.state;
    const { languages } = this.props;
    return (
      <div className='skillBrowser'>
        <TalentDescription skill={module || language} />
        <LanguageSelector languages={languages} selected={language} select={this.selectLanguage} />
        <LanguageDisplay language={language} selectModule={this.selectModule} selected={module} />
      </div>
    );
  }
}

export default SkillsBrowser;
