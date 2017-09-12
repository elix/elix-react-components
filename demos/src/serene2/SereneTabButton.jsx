import React from 'react';
import ReactDOM from 'react-dom';

import FocusMixin from '../../../src/mixins/FocusMixin';
import HoverMixin from '../../../src/mixins/HoverMixin';


const Base = 
  FocusMixin(
  HoverMixin(
    React.Component
  ));


export default class SereneTabButton extends Base {

  render() {

    const rootProps = this.rootProps();

    const active = this.state.hover || this.state.focusRing;
    const activeStyle = {
      'background': '#444',
      'zIndex': 1
    };

    const selected = this.props.selected;
    const selectedStyle = {
      'background': '#666'
    };

    const activeSelectedStyle = {
      'background': '#777'
    };

    const focusRingStyle = {
      'outline': !this.state.focusRing && 'none'
    };

    rootProps.style = Object.assign(
      {},
      rootProps.style,
      this.props.style,
      {
        'background': '#222',
        'border': 'none',
        'borderRadius': 0,
        'color': 'inherit',
        'display': 'inline-block',
        'fontSize': '18px',
        'margin': '0',
        'outline': 'none',
        'padding': '0.5em 1em',
        'touchAction': 'manipulation',
        'transition': 'background 0.6s ease-out',
        'WebkitTapHighlightColor': 'transparent',
        'whiteSpace': 'nowrap'
      },
      active && activeStyle,
      focusRingStyle,
      selected && selectedStyle,
      active && selected && activeSelectedStyle
    );

    return (
      <button {...rootProps}>
        {this.props.children}
      </button>
    );
  }

  rootProps() {
    const base = super.rootProps ? super.rootProps() : {};
    return Object.assign({}, base, {
      'aria-label': this.props['aria-label'],
      'aria-selected': this.props['aria-selected'],
      className: this.props.className,
      role: this.props.role
    });
  }
}
