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
    const style = {
      'alignItems': 'center',
      'display': 'flex',
      'flexDirection': 'column',
      'height': '100%',
      'justifyContent': 'center',
      'left': 0,
      'position': 'absolute',
      'top': 0,
      'width': '100%'
    }
    const backdropStyle = Object.assign({}, this.props.style, {
      'background': 'black',
      'height': '100%',
      'left': 0,
      'opacity': 0.2,
      'position': 'absolute',
      'top': 0,
      'width': '100%'
    });
    const containerStyle = {
      'background': 'white',
      'border': '1px solid rgba(0, 0, 0, 0.2)',
      'boxShadow': '0 2px 10px rgba(0, 0, 0, 0.5)',
      'opacity': 1,
      'position': 'relative'
    };
    return (
      <div style={style}>
        <div role="none" style={backdropStyle}/>
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
      'height': '100%',
      'left': '0',
      'outline': 'none',
      'position': 'fixed',
      'top': '0',
      'WebkitTapHighlightColor': 'transparent',
      'width': '100%',
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

    // const Backdrop = this.backdrop();
    // return React.createElement(backdrop, rootProps, this.props.children);
    return (
      <div ref={el => this.root = el} {...rootProps}>
        <DialogBackdrop>
          {this.props.children}
        </DialogBackdrop>
      </div>
    );
  }

}
