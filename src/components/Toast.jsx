import React from 'react';
import ReactDOM from 'react-dom';

import LanguageDirectionMixin from '../mixins/LanguageDirectionMixin';
import OverlayMixin from '../mixins/OverlayMixin';
import VisualStateMixin from '../mixins/VisualStateMixin';


const Base =
  LanguageDirectionMixin(
  OverlayMixin(
  VisualStateMixin(
    React.Component
  )));


export default class Toast extends Base {

  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.state, {
      fromEdge: this.props.fromEdge || 'bottom'
    });
    this.immediateTransitions = {
      'opened': 'expanded'
    };
    this.transitionEndTransitions = {
      'collapsed': 'closed'
    };
    this.mouseout = this.mouseout.bind(this);
    this.mouseover = this.mouseover.bind(this);
  }

  close() {
    const nextVisualState = this.state.visualState === 'expanded' ?
      'collapsed' :
      'closed';
    this.changeVisualState(nextVisualState);
  }

  componentDidMount() {
    if (super.componentDidMount) { super.componentDidMount(); }
    startTimerIfExpanded(this);
  }

  componentDidUpdate() {
    if (super.componentDidUpdate) { super.componentDidUpdate(); }
    startTimerIfExpanded(this);
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
    let rootProps = this.rootProps();
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
    rootProps = Object.assign({}, rootProps, {
      onMouseOut: this.mouseout,
      onMouseOver: this.mouseover,
      style
    });

    const oppositeEdge = {
      'bottom-left': 'bottom-right',
      'bottom-right': 'bottom-left',
      'top-left': 'top-right',
      'top-right': 'top-left'
    };
    const fromEdge = this.state.fromEdge;
    const languageAdjustedEdge = this.rightToLeft ?
      (oppositeEdge[fromEdge] || fromEdge) :
      fromEdge;
    
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
    const contentEdgeStyle = contentEdgeStyles[languageAdjustedEdge];

    const expanded = this.state.visualState === 'expanded';
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
      expandedContentEdgeStyles[languageAdjustedEdge]
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
      expanded && expandedContentStyle
    );

    return (
      <div ref={el => this.root = el} {...rootProps}>
        <div style={contentStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }

  mouseout() {
    startTimerIfExpanded(this);
  }

  mouseover() {
    clearTimer(this);
  }

}


function clearTimer(component) {
  if (component.timeout) {
    clearTimeout(component.timeout);
    component.timeout = null;
  }
}

function startTimer(component) {
  clearTimer(component);
  const duration = component.props.duration;
  if (duration != null && duration > 0) {
    component.timeout = setTimeout(() => {
      component.close();
    }, duration);
  }
}

function startTimerIfExpanded(component) {
  if (component.state.visualState === 'expanded') {
    startTimer(component);
  }
}
