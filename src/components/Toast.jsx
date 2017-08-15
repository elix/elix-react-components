import React from 'react';
import ReactDOM from 'react-dom';

import KeyboardMixin from '../mixins/KeyboardMixin';
import OverlayMixin from '../mixins/OverlayMixin';
import TransitionMixin from '../mixins/TransitionMixin';


const Base =
  KeyboardMixin(
  OverlayMixin(
  TransitionMixin(
    React.Component
  )));


export default class Toast extends Base {

  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.state, {
      fromEdge: this.props.fromEdge || 'bottom'
    });
  }

  componentWillReceiveProps(props) {
    if (super.componentWillReceiveProps) { super.componentWillReceiveProps(props); }
    if (props.fromEdge !== this.state.fromEdge) {
      this.setState({
        fromEdge: props.fromEdge
      });
    }
  }

  render() {
    const rootEdgeStyles = {
      'bottom': {
        'alignItems': 'center',
        'justifyContent': 'flex-end',
      },
      'bottom-left': {
        'alignItems': 'flex-start',
        'justifyContent': 'flex-end',
      },
      'bottom-right': {
        'alignItems': 'flex-end',
        'justifyContent': 'flex-end',
      },
      'top': {
        'alignItems': 'center',
      },
      'top-left': {
        'alignItems': 'flex-start'
      },
      'top-right': {
        'alignItems': 'flex-end'
      }
    };
    const rootEdgeStyle = rootEdgeStyles[this.state.fromEdge];

    // Merge style set on this component on top of default style.
    const rootProps = this.rootProps();
    const style = Object.assign(
      {
        'display': rootProps.style && rootProps.style.display || 'flex',
        'flexDirection': 'column',
        'height': '100%',
        'left': 0,
        'outline': 'none',
        'pointerEvents': 'none',
        'position': 'fixed',
        'top': 0,
        'WebkitTapHighlightColor': 'transparent',
        'width': '100%'
      },
      rootEdgeStyle,
      rootProps.style,
      this.props.style
    );
    Object.assign(rootProps, { style });
    
    const contentEdgeStyles = {
      'bottom': {
        'transform': 'translateY(100%)'
      },
      'bottom-left': {
        'transform': 'translateX(-100%)'
      },
      'bottom-right': {
        'transform': 'translateX(100%)'
      },
      'top': {
        'transform': 'translateY(-100%)'
      },
      'top-left': {
        'transform': 'translateX(-100%)'
      },
      'top-right': {
        'transform': 'translateX(100%)'
      }
    };
    const contentEdgeStyle = contentEdgeStyles[this.state.fromEdge];

    const expandedContentEdgeStyles = {
      'bottom': {
        'transform': 'translateY(0)'
      },
      'bottom-left': {
        'transform': 'translateX(0)'
      },
      'bottom-right': {
        'transform': 'translateX(0)'
      },
      'top': {
        'transform': 'translateY(0)'
      },
      'top-left': {
        'transform': 'translateX(0)'
      },
      'top-right': {
        'transform': 'translateX(0)'
      }
    };

    const expandedContentStyle = Object.assign(
      {
        'opacity': 1
      },
      expandedContentEdgeStyles[this.state.fromEdge]
    );
    
    const contentStyle = Object.assign(
      {},
      this.props.contentStyle || {
        'background': 'white',
        'border': '1px solid rgba(0, 0, 0, 0.2)',
        'boxShadow': '0 2px 10px rgba(0, 0, 0, 0.5)',
        'margin': '1em',
        'opacity': 0,
        'pointerEvents': 'initial',
        'position': 'relative',
        'transitionDuration': '0.25s',
        'transitionProperty': 'opacity, transform',
        'willChange': 'opacity, transform'
      },
      contentEdgeStyle,
      this.state.expanded && expandedContentStyle
    );

    return (
      <div ref={el => this.root = el} {...rootProps}>
        <div style={contentStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }

}
