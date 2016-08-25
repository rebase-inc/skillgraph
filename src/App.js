import React, { Component } from 'react';
import './App.css';

import SkillsGraph from './SkillsGraph';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { language: null }
    this.selectLanguage = this.selectLanguage.bind(this);
  }
  selectLanguage(languageName) {
    this.setState({ language: languageName });
  }
  render() {
    console.log('language is ', this.state.language);
    return (
      <div className="App" onClick={() => this.setState(prevState => ({ foo: prevState.foo + 1 }))}>
        <SkillsGraph language={this.state.language} selectLanguage={this.selectLanguage} />
        { this.state.language ? <div onClick={this.selectLanguage.bind(null, null)}> GO BACK </div> : null }
      </div>
    );
  }
}

export default App;
