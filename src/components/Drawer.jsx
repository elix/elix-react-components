import React from 'react';
import ReactDOM from 'react-dom';

import DialogModalityMixin from '../mixins/DialogModalityMixin';
import KeyboardMixin from '../mixins/KeyboardMixin';
import ModalBackdrop from './ModalBackdrop';
import OverlayMixin from '../mixins/OverlayMixin';
import TouchSwipeMixin from '../mixins/TouchSwipeMixin';
import VisualStateMixin from '../mixins/VisualStateMixin';


const Base =
  DialogModalityMixin(
  KeyboardMixin(
  OverlayMixin(
  TouchSwipeMixin(
  VisualStateMixin(
    React.Component
  )))));


export default class Drawer extends Base {

  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.state, {
      selectedIndex: 0
    });
    this.backdropClick = this.backdropClick.bind(this);
    this.immediateTransitions = {
      'opened': 'expanded'
    };
    this.transitionEndTransitions = {
      'collapsed': 'closed'
    };
  }

  backdropClick() {
    this.close();
  }

  close() {
    const nextVisualState = this.state.visualState === 'expanded' ?
      'collapsed' :
      'closed';
    this.changeVisualState(nextVisualState);
  }

  render() {
    if (this.closed) {
      return null;
    }

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
    
    const swiping = this.state.swiping;
    const swipeFraction = Math.max(Math.min(this.state.swipeFraction, 1), 0);

    const expanded = this.state.visualState === 'expanded';
    let opacity = 0.2;
    if (swiping) {
      opacity *= 1 - swipeFraction;
    }
    const expandedBackdropStyle = {
      opacity
    };
    
    const backdropStyle = Object.assign(
      {
        'opacity': 0,
        'transition': !swiping && 'opacity 0.25s linear',
        'willChange': 'opacity'
      },
      expanded && expandedBackdropStyle
    );

    const expandedContentStyle = {
      'transform': `translateX(${-100 * swipeFraction}%)`
    };
    const contentStyle = Object.assign(
      this.props.contentStyle || {
        'background': 'white',
        'border': '1px solid rgba(0, 0, 0, 0.2)',
        'boxShadow': '0 2px 10px rgba(0, 0, 0, 0.5)',
        'position': 'relative',
        'transform': 'translateX(-100%)',
        'willChange': 'transform',
        'transition': !swiping && 'transform 0.25s'
      },
      expanded && expandedContentStyle
    );

    return (
      <div ref={el => this.root = el} {...rootProps}>
        <ModalBackdrop onClick={this.backdropClick} style={backdropStyle}></ModalBackdrop>
        <div ref={el => this.contentElement = el} style={contentStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }
  
  swipeLeft() {
    const visualState = this.state.swipeFraction >= 1 ?
      'closed' :
      'collapsed';
    this.changeVisualState(visualState);
  }

  get swipeTarget() {
    return this.contentElement;
  }

}
