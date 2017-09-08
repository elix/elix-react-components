import React from 'react';
import ReactDOM from 'react-dom';

import HoverMixin from './HoverMixin';


export default function ArrowSelectionMixin(Base) {
  return class HasArrowSelection extends Base {

    constructor(props) {
      super(props);
      this.ArrowSelection = ArrowSelection.bind(this);
      this.rightButtonClick = this.rightButtonClick.bind(this);
      this.leftButtonClick = this.leftButtonClick.bind(this);
    }

    leftButtonClick() {
      this.selectPrevious();
    }

    rightButtonClick() {
      this.selectNext();
    }

  }
}


function ArrowSelection(props) {

  const style = Object.assign({}, {
    'display': 'flex',
    'position': 'relative'
  }, props.style);

  const leftButtonDisabled = !this.canSelectPrevious;
  const rightButtonDisabled = !this.canSelectNext;
  const leftButtonStyle = {
    'left': 0
  };
  const rightButtonStyle = {
    'right': 0
  };

  const iconStyle = {
    'height': '48px',
    'width': '48px'
  };

  const contentStyle = {
    'flex': 1,
    'position': 'relative'
  };

  // Accessibility note: since the navigation offered by the arrow buttons
  // should be redundant (that is, there should be other ways of navigating the
  // list), we mark the button as aria - hidden so that assistive devices ignore
  // them.
  return (
    <div style={style} role="none">
      <ArrowButton
        aria-hidden="true"
        disabled={leftButtonDisabled}
        onClick={this.leftButtonClick}
        style={leftButtonStyle}
        tabIndex="-1"
        >
        <svg style={iconStyle} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
          <g id="chevron-left">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </g>
        </svg>
      </ArrowButton>
      <div style={contentStyle} role="none">
        {props.children}
      </div>
      <ArrowButton
        style={rightButtonStyle}
        disabled={rightButtonDisabled}
        onClick={this.rightButtonClick}
        tabIndex="-1"
        aria-hidden="true"
        >
        <svg style={iconStyle} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
          <g id="chevron-right">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </g>
        </svg>
      </ArrowButton>
    </div>
  );
}


class ArrowButton extends HoverMixin(React.Component) {

  render() {

    const rootProps = this.rootProps();

    const buttonDisabledStyle = {
      'color': 'rgba(255, 255, 255, 0.3)'
    };
    const buttonHoverStyle = {
      'background': 'rgba(255, 255, 255, 0.2)',
      'color': 'rgba(255, 255, 255, 0.8)',
      'cursor': 'pointer'
    };
    const buttonHiddenStyle = {
      'display': 'none'
    };

    rootProps.style = Object.assign(
      {},
      rootProps.style,
      {
        'background': 'transparent',
        'border': '1px solid transparent',
        'boxSizing': 'border-box',
        'bottom': 0,
        'color': 'rgba(255, 255, 255, 0.7)',
        'fill': 'currentColor',
        'margin': '0',
        'opacity': '1',
        'outline': 'none',
        'padding': '0',
        'position': 'absolute',
        'top': 0,
        'transition': 'opacity 1s',
        'zIndex': '1',
      },
      this.state.hover && !this.props.disabled && buttonHoverStyle,
      this.props.disabled && buttonDisabledStyle,
      supportsTouch() && buttonHiddenStyle,
      this.props.style
    );

    return (
      <button
        aria-hidden="true"
        disabled={this.props.disabled}
        onClick={this.props.onClick}
        tabIndex="-1"
        {...rootProps}
        >
        {this.props.children}
      </button>
    );
  }
}


// Simplistic detection of touch support.
function supportsTouch() {
  return 'ontouchstart' in window;
}
