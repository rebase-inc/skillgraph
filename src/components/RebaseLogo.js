import React, { Component } from 'react';

export default class RebaseLogo extends Component {
  render() {
    return (
      <svg height='68px' width='68px' viewBox='0 0 68 68' fill='white' className='rebaseLogo' onClick={() => window.location = 'https://rebaseapp.com'}>
        { 'REBASE'.split('').map((el, ind) => <text textAnchor='middle' x={10 + 24 * (ind % 3)} y={26 + 34 * Math.floor(ind / 3)} fontSize='24px'>{el}</text>) }
        <rect height='68px' width='68px' fill='transparent' />
      </svg>
    );
  }
}
