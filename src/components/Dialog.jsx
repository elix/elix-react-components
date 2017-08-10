import React from 'react';
import ReactDOM from 'react-dom';

import DialogModalityMixin from '../mixins/DialogModalityMixin';
import KeyboardMixin from '../mixins/KeyboardMixin';
import OverlayMixin from '../mixins/OverlayMixin';
import ModalBackdrop from './ModalBackdrop';


const Base =
  DialogModalityMixin(
  KeyboardMixin(
  OverlayMixin(
    React.Component
  )));


export default class Dialog extends Base {

  // backdrop() {
  //   return this.props.backdrop || DialogBackdrop;
  // }

  render() {

    const rootProps = this.rootProps();
  
    // Merge style set on this component on top of default style.
    const style = Object.assign(
      {
        'alignItems': 'center',
        'display': rootProps.style && rootProps.style.display || 'flex',
        'flexDirection': 'column',
        'height': '100%',
        'justifyContent': 'center',
        'left': 0,
        'outline': 'none',
        'position': 'fixed',
        'top': 0,
        'WebkitTapHighlightColor': 'transparent',
        'width': '100%'
      },
      rootProps.style,
      this.props.style
    );

    const contentStyle = this.props.contentStyle || {
      'background': 'white',
      'border': '1px solid rgba(0, 0, 0, 0.2)',
      'boxShadow': '0 2px 10px rgba(0, 0, 0, 0.5)',
      'position': 'relative'
    };

    Object.assign(rootProps, { style });

    // const Backdrop = this.backdrop();
    // return React.createElement(backdrop, rootProps, this.props.children);
    return (
      <div ref={el => this.root = el} {...rootProps}>
        <ModalBackdrop></ModalBackdrop>
        <div style={contentStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }

}