import React from 'react';
import SpinningGears from './SpinningGears';

const LoadingBox = (props) => (
  <div className='loadingBox'>
    <SpinningGears />
    <div>{'Computing skills...'}</div>
  </div>
)

export default LoadingBox;
