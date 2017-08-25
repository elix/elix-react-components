import React from 'react';
import ReactDOM from 'react-dom';

import HoverMixin from '../../../src/mixins/HoverMixin';


const Base = 
  HoverMixin(
    React.Component
  );


export default class ThemedTabButton extends Base {

  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.state, {
      focusRing: false
    });
    this.blur = this.blur.bind(this);
    this.focus = this.focus.bind(this);
    this.mousedown = this.mousedown.bind(this);
    this.focusedWithKeyboard = false;
  }

  blur(event) {
    this.setState({
      focusRing: false
    });
  }

  focus(event) {
    // Go back to assuming use of the keyboard.
    this.setState({
      focusRing: this.focusedWithKeyboard
    });
    this.focusedWithKeyboard = true;
  }

  mousedown(event) {
    // If this element receives focus, it won't be because of the keyboard.
    this.focusedWithKeyboard = false;
  }

  render() {

    const rootProps = this.rootProps();

    const active = this.state.hover || this.state.focusRing;
    const activeStyle = {
      'background': '#444'
    };

    const selected = this.props.selected;
    const selectedStyle = {
      'background': '#666'
    };

    const activeSelectedStyle = {
      'background': '#777'
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
        'outline': 'none',
        'padding': '0.5em 1em',
        'transition': 'background 0.6s ease-out',
        'WebkitTapHighlightColor': 'transparent',
        'whiteSpace': 'nowrap'
      },
      active && activeStyle,
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
      onBlur: this.blur,
      role: this.props.role,
      onFocus: this.focus,
      onMouseDown: this.mousedown
    });
  }
}
