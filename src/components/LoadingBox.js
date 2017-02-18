import React, { Component } from 'react';
import SpinningGears from './SpinningGears';
import { Line, Circle } from 'rc-progress';

class LoadingBox extends Component {
  render() {
    const { jobs } = this.props;
    const scanJob = jobs.find(j => j.name == 'scan');
    const sofar = scanJob ? scanJob.progress.finished.reduce((total, step) => total + step, 0) : 0;
    const total = scanJob ? scanJob.progress.steps.reduce((total, step) => total + step, 0) : 0;
    const scanning = sofar == 0 || sofar < total;
    return (
      <div className='loadingBox'>
        <SpinningGears />
        <div>{ scanning ? 'Scanning commit ' + sofar + ' of ' + total : 'Updating ranking...' }</div> 
        { scanning ? <Line percent={100 * sofar / total} strokeWidth='4' strokeColor='#FDC733' /> : null }
      </div>
    );
  }
}

export default LoadingBox;
