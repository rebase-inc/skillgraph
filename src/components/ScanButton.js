import React, { Component } from 'react';

import AnalyzeIcon from './AnalyzeIcon';

const ScanButton = (props) => (
  <div className='scanButton' onClick={props.scan}>
    <span>{'You have new activity on your GitHub account!'}</span>
    <span>{'Click here to scan your account again'}</span>
  </div>
);

export default ScanButton;
