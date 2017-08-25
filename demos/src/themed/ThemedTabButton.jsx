import React from 'react';
import ReactDOM from 'react-dom';

import HoverMixin from '../../../src/mixins/HoverMixin';


const Base = 
  HoverMixin(
    React.Component
  );


export default class ThemedTabButton extends Base {

  render() {

    const rootProps = this.rootProps();

    const hoverStyle = {
      'background': '#444'
    };

    const selected = this.props.selected;
    const selectedStyle = {
      'background': '#666'
    };  

    const style = Object.assign(
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
        'outline': 'none',
        'padding': '0.5em 1em',
        'transition': 'background 0.6s ease-out',
        'WebkitTapHighlightColor': 'transparent',
        'whiteSpace': 'nowrap'
      },
      this.state.hover && hoverStyle,
      selected && selectedStyle
    );

    Object.assign(rootProps, {
      'aria-label': this.props['aria-label'],
      'aria-selected': this.props['aria-selected'],
      className: this.props.className,
      role: this.props.role,
      style
    });

    return (
      <button {...rootProps}>
        {this.props.children}
      </button>
    );
  }
}
