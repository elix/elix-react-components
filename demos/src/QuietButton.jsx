import React from 'react';
import ReactDOM from 'react-dom';

import FocusMixin from '../../src/mixins/FocusMixin';


const Base =
  FocusMixin(
    React.Component
  );


export default class QuietButton extends Base {

  render() {
    const rootProps = this.rootProps();
    const style = Object.assign(
      {},
      rootProps.style,
      {
        'background': 'none',
        'border': 'none',
        'outline': !this.state.focusRing && 'none',
        'padding': 0,
        'WebkitTapHighlightColor': 'transparent'
      },
      this.props.style
    );

    const props = Object.assign({}, rootProps, {
      'aria-label': this.props['aria-label'],
      'onClick': this.props.onClick,
      style
    });

    return (
      <button {...props}>
        {this.props.children}
      </button>
    );
  }

}
