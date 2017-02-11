import React, { Component } from 'react';
import SpinningGears from './SpinningGears';

class LoadingBox extends Component {
  render() {
    const { jobs } = this.props;
    const sofar = jobs.find(j => j.name == 'scan').progress.finished.reduce((total, step) => total + step, 0);
    const total = jobs.find(j => j.name == 'scan').progress.steps.reduce((total, step) => total + step, 0);
    console.log(jobs.find(j => j.name == 'scan').progress.toJS());
    console.log('sofar is ', sofar); 
    console.log('total is ', total); 
    return (
      <div className='loadingBox'>
        <SpinningGears />
        <div>{sofar}</div>
        <div>{total}</div>
        <progress value={sofar} max={total} />
        <div>{'Computing skills...'}</div>
      </div>
    );
  }
}

export default LoadingBox;
