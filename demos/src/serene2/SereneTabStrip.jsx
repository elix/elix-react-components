import React from 'react';
import ReactDOM from 'react-dom';

import TabStrip from '../../../src/components/TabStrip';


export default class SereneTabStrip extends TabStrip {

  rootProps() {
    const base = super.rootProps ? super.rootProps() : {};
    const style = Object.assign({}, base.style, {
      'background': '#222',
      'color': 'white',
      'fontFamily': 'Gentium Basic',
      'padding': '0 33px'
    });
    return Object.assign({}, base, { style });
  }

}
