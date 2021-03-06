import React from 'react';
import ReactDOM from 'react-dom';

import DialogModalityMixin from '../mixins/DialogModalityMixin';
import KeyboardMixin from '../mixins/KeyboardMixin';
import LanguageDirectionMixin from '../mixins/LanguageDirectionMixin';
import ModalBackdrop from './ModalBackdrop';
import OverlayMixin from '../mixins/OverlayMixin';
import TouchSwipeMixin from '../mixins/TouchSwipeMixin';
import TrackpadSwipeMixin from '../../src/mixins/TrackpadSwipeMixin.js';
import VisualStateMixin from '../mixins/VisualStateMixin';


const Base =
  DialogModalityMixin(
  KeyboardMixin(
  LanguageDirectionMixin(
  OverlayMixin(
  TouchSwipeMixin(
  TrackpadSwipeMixin(
  VisualStateMixin(
    React.Component
  )))))));


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

  get backdropStyle() {
    const expanded = this.state.visualState === 'expanded';
    const swiping = this.state.swipeFraction !== null;
    const maxOpacity = 0.2;
    const minOpacity = 0;
    let opacity = maxOpacity;
    if (swiping) {
      const sign = this.rightToLeft ? -1 : 1;
      const swipeFraction = Math.max(Math.min(sign * this.state.swipeFraction, 1), 0);
      opacity = maxOpacity - (swipeFraction * (maxOpacity - minOpacity));
    }
    const expandedBackdropStyle = {
      opacity
    };
    return Object.assign(
      {
        'opacity': 0,
        'transition': !swiping && 'opacity 0.25s linear',
        'willChange': 'opacity'
      },
      expanded && expandedBackdropStyle
    );
  }

  close() {
    const nextVisualState = this.state.visualState === 'expanded' ?
      'collapsed' :
      'closed';
    this.changeVisualState(nextVisualState);
  }

  get contentStyle() {
    const sign = this.rightToLeft ? -1 : 1;
    const expanded = this.state.visualState === 'expanded';
    const swiping = this.state.swipeFraction !== null;
    const swipeFraction = Math.max(Math.min(sign * this.state.swipeFraction, 1), 0);
    const expandedContentStyle = {
      'transform': `translateX(${-sign * swipeFraction * 100}%)`
    };
    return Object.assign(
      this.props.contentStyle || {
        'background': 'white',
        'border': '1px solid rgba(0, 0, 0, 0.2)',
        'boxShadow': '0 2px 10px rgba(0, 0, 0, 0.5)',
        'position': 'relative',
        'transform': `translateX(${-sign * 100}%)`,
        'transition': !swiping && 'transform 0.25s',
        'willChange': 'transform'
      },
      expanded && expandedContentStyle
    );
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
    
    const backdropStyle = this.backdropStyle;
    const contentStyle = this.contentStyle;

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
    if (!this.rightToLeft) {
      const visualState = this.state.swipeFraction >= 1 ?
        'closed' :
        'collapsed';
      this.changeVisualState(visualState);
    }
  }
  
  swipeRight() {
    if (this.rightToLeft) {
      const visualState = this.state.swipeFraction <= -1 ?
        'closed' :
        'collapsed';
      this.changeVisualState(visualState);
    }
  }

  get swipeTarget() {
    return this.contentElement;
  }

}
