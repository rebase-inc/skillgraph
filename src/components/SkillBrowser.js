import React, { Component } from 'react';

import LanguageDisplay from './LanguageDisplay';
import LanguageSelector from './LanguageSelector';
import ModuleDescription from './ModuleDescription';
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
    this.setState({
      module: this.props.modules.get(`${this.state.language.name}_${name}`)
    });
  }
  render() {
    const { language, module } = this.state;
    const { languages } = this.props;
    const modules = language.modules.map(name => this.props.modules.get(name));  
    return (
      <div className='skillBrowser'>
        <LanguageSelector languages={languages} selected={language} select={this.selectLanguage} />
        <ModuleDescription module={module || language} />
        <LanguageDisplay modules={modules} onHover={this.selectModule} selected={module} />
      </div>
    );
  }
}

export default SkillsBrowser;
