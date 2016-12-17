import React, { Component } from 'react';
import './App.css';

import SkillsGraph from './SkillsGraph';

class App extends Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (
      <div className="App">
        <SkillsGraph />
      </div>
    );
  }
}

export default App;
