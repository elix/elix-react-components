import React from 'react';
import ReactDOM from 'react-dom';

import DialogModalityMixin from '../mixins/DialogModalityMixin';
import KeyboardMixin from '../mixins/KeyboardMixin';
import OverlayMixin from '../mixins/OverlayMixin';


const Base =
  DialogModalityMixin(
  KeyboardMixin(
  OverlayMixin(
    React.Component
  )));


class DialogBackdrop extends React.Component {

  render() {
    const backdropStyle = Object.assign({}, this.props.style, {
      'background': 'black',
      'opacity': '0.2'
    });
    const containerStyle = {
      'background': 'white',
      'border': '1px solid rgba(0, 0, 0, 0.2)',
      'boxShadow': '0 2px 10px rgba(0, 0, 0, 0.5)'
    };
    return (
      <div role="none" style={backdropStyle}>
        <div style={containerStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }
}


export default class Dialog extends Base {

  backdrop() {
    return this.props.backdrop || DialogBackdrop;
  }

  rootProps() {
    const base = super.rootProps ? super.rootProps() : {};
    const style = Object.assign({}, base.style, {
      'position': 'absolute'
    });
    return Object.assign({}, base, { style });
  }

  render() {
    const rootProps = this.rootProps();
    // Merge style set on this component on top of default style.
    Object.assign(
      rootProps.style,
      this.props.style
    );
    // rootProps.ref = el => this.root = el;

    const Backdrop = this.backdrop();
    // return React.createElement(backdrop, rootProps, this.props.children);
    return (
      <DialogBackdrop ref={el => this.root = el} {...rootProps}>
        {this.props.children}
      </DialogBackdrop>
    );
  }

}
