import React, { Component } from 'react';

import AnalyzeIcon from './AnalyzeIcon';

const ScanButton = (props) => (
  <div className='scanButton' onClick={props.scan}>
    <AnalyzeIcon />
    <div> {props.text || 'scan'} </div>
  </div>
);

export default ScanButton;
