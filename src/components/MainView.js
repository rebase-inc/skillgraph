import React, { Component } from 'react';

import InfoPanel from './InfoPanel';
import LanguageDisplay from './LanguageDisplay';

export default class MainView extends Component {
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
    const { languages, user, scan, logout } = this.props;
    const { language, module } = this.state;
    const modules = language.modules.map(name => this.props.modules.get(name));  
    return (
      <div className='App'>
        <InfoPanel languages={languages} user={user} selectLanguage={this.selectLanguage} language={language} scan={scan} />
        <LanguageDisplay modules={modules} onHover={this.selectModule} selected={module} />
      </div>
    );
  }
}
