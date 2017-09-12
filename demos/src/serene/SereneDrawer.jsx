import React from 'react';
import ReactDOM from 'react-dom';

import Drawer from '../../../src/components/Drawer';


export default class SereneDrawer extends Drawer {

  get backdropStyle() {
    const base = super.backdropStyle;
    const swiping = this.state.swiping;
    return Object.assign({}, base, {
      'transition': !swiping && 'opacity 0.5s linear',
    });
  }

  get contentStyle() {
    const base = super.contentStyle;
    const swiping = this.state.swiping;
    const expanded = this.state.visualState === 'expanded';
    const swipeFraction = Math.max(Math.min(this.state.swipeFraction, 1), 0);
    const expandedContentStyle = {
      'opacity': 1 - swipeFraction
    };
    return Object.assign(
      {},
      base,
      {
        'background': '#222',
        'color': 'white',
        'fontFamily': 'Gentium Basic',
        'fontSize': '18px',
        'opacity': 0,
        'transition': !swiping && 'opacity 0.5s',
        'transform': 'none',
        'willChange': 'opacity'
      },
      expanded && expandedContentStyle
    );
  }

}
