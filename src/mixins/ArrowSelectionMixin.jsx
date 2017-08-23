import React from 'react';
import ReactDOM from 'react-dom';

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

  const buttonStyle = {
    'background': 'transparent',
    'border': '1px solid transparent',
    'boxSizing': 'border-box',
    'cursor': 'pointer',
    'color': 'rgba(255, 255, 255, 0.7)',
    'fill': 'currentColor',
    'margin': '0',
    'opacity': '1',
    'outline': 'none',
    'padding': '0',
    'transition': 'opacity 1s',
    'zIndex': '1',
  };
  const disabledButtonStyle = {
    'color': 'rgba(255, 255, 255, 0.3)'
  };
  const leftButtonDisabled = !this.canSelectPrevious;
  const rightButtonDisabled = !this.canSelectNext;
  const leftButtonStyle = Object.assign(
    {},
    buttonStyle,
    {
      'left': 0
    },
    leftButtonDisabled && disabledButtonStyle
  );
  const rightButtonStyle = Object.assign(
    {},
    buttonStyle,
    {
      'right': 0
    },
    rightButtonDisabled && disabledButtonStyle
  );

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
    <div style={style}>
      <button
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
      </button>
      <div style={contentStyle} role="none">
        {props.children}
      </div>
      <button
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
      </button>
    </div>
  );
}
