import React from 'react';
import ReactDOM from 'react-dom';

import KeyboardMixin from '../mixins/KeyboardMixin';
import OverlayMixin from '../mixins/OverlayMixin';
import PopupModalityMixin from '../mixins/PopupModalityMixin';
import VisualStateMixin from '../mixins/VisualStateMixin';


const Base =
  KeyboardMixin(
  OverlayMixin(
  PopupModalityMixin(
  VisualStateMixin(
    React.Component
  ))));


export default class Popup extends Base {

  close() {
    this.changeVisualState('closed');
  }

  render() {

    // Merge style set on this component on top of default style.
    const rootProps = this.rootProps();
    const style = Object.assign(
      {
        'alignItems': 'center',
        'display': rootProps.style && rootProps.style.display || 'flex',
        'flexDirection': 'column',
        'height': '100%',
        'justifyContent': 'center',
        'left': 0,
        'outline': 'none',
        'pointerEvents': 'none',
        'position': 'fixed',
        'top': 0,
        'WebkitTapHighlightColor': 'transparent',
        'width': '100%'
      },
      rootProps.style,
      this.props.style
    );
    Object.assign(rootProps, { style });

    const contentStyle = this.props.contentStyle || {
      'background': 'white',
      'border': '1px solid rgba(0, 0, 0, 0.2)',
      'boxShadow': '0 2px 10px rgba(0, 0, 0, 0.5)',
      'pointerEvents': 'initial',
      'position': 'relative'
    };

    return (
      <div ref={el => this.root = el} {...rootProps}>
        <div style={contentStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }

}
