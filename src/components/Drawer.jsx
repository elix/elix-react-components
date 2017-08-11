import React from 'react';
import ReactDOM from 'react-dom';

import DialogModalityMixin from '../mixins/DialogModalityMixin';
import KeyboardMixin from '../mixins/KeyboardMixin';
import ModalBackdrop from './ModalBackdrop';
import OverlayMixin from '../mixins/OverlayMixin';
import TransitionMixin from '../mixins/TransitionMixin';


const Base =
  DialogModalityMixin(
  KeyboardMixin(
  OverlayMixin(
  TransitionMixin(
    React.Component
  ))));


export default class Drawer extends Base {

  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.state, {
      selectedIndex: 0
    });
    this.backdropClick = this.backdropClick.bind(this);
  }

  backdropClick() {
    this.close();
  }

  render() {

    const rootProps = this.rootProps();

    // Merge style set on this component on top of default style.
    const style = Object.assign(
      {
        'alignItems': 'stretch',
        'display': rootProps.style && rootProps.style.display || 'flex',
        'flexDirection': 'row',
        'left': 0,
        'height': '100%',
        'justifyContent': 'flex-start',
        'outline': 'none',
        'position': 'fixed',
        'top': 0,
        'WebkitTapHighlightColor': 'transparent',
        'width': '100%'
      },
      rootProps.style,
      this.props.style
    );
    Object.assign(rootProps, { style });
    
    const expandedBackdropStyle = {
      opacity: 0.2
    };
    const backdropStyle = Object.assign(
      {
        'opacity': 0,
        'transition': 'opacity 0.25s linear',
        'willChange': 'opacity'
      },
      this.state.expanded && expandedBackdropStyle
    );

    const expandedContentStyle = {
      'transform': 'translateX(0)'
    };
    const contentStyle = Object.assign(
      this.props.contentStyle || {
        'background': 'white',
        'border': '1px solid rgba(0, 0, 0, 0.2)',
        'boxShadow': '0 2px 10px rgba(0, 0, 0, 0.5)',
        'position': 'relative',
        'transform': 'translateX(-100%)',
        'willChange': 'transform',
        'transition': 'transform 0.25s'
      },
      this.state.expanded && expandedContentStyle
    );

    return (
      <div ref={el => this.root = el} {...rootProps}>
        <ModalBackdrop onClick={this.backdropClick} style={backdropStyle}></ModalBackdrop>
        <div style={contentStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }

}
