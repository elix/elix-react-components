import React from 'react';
import ReactDOM from 'react-dom';


export default class TabButton extends React.Component {

  render() {
    const baseStyle = {
      'background': 'white',
      'border': '1px solid #ccc',
      'margin': '0',
      'padding': '0.5em 0.75em',
      'transition': 'border-color 0.25s'
    }

    const tabAlign = this.props.tabAlign;
    const alignStyle = tabAlign === 'stretch' && {
      'flex': 1
    };

    const tabPosition = this.props.tabPosition;
    const positionStyles = {
      bottom: {
        'borderRadius': '0 0 0.25em 0.25em',
        'marginTop': '-1px'
      },
      left: {
        'borderRadius': '0.25em 0 0 0.25em',
        'marginRight': '-1px'
      },
      right: {
        'borderRadius': '0 0.25em 0.25em 0',
        'marginLeft': '-1px'
      },
      top: {
        'borderRadius': '0.25em 0.25em 0 0',
        'marginBottom': '-1px'
      }
    };
    const positionStyle = positionStyles[tabPosition];

    const index = this.props.index;
    const needsSpacer = index > 0;
    const spacerStyle = tabPosition === 'top' || tabPosition === 'bottom' ?
      {
        'marginLeft': '0.2em'
      } :
      {
        'marginTop': '0.2em'
      };

    const selected = this.props.selected;
    const selectedStyle = {
      'opacity': '1'
    };
    const borderSides = {
      'bottom': 'borderTopColor',
      'left': 'borderRightColor',
      'right': 'borderLeftColor',
      'top': 'borderBottomColor'
    };
    const borderSide = borderSides[tabPosition];
    selectedStyle[borderSide] = 'transparent';

    const style = Object.assign(
      {},
      baseStyle,
      alignStyle,
      positionStyle,
      needsSpacer && spacerStyle,
      selected && selectedStyle
    );

    const props = {
      'aria-selected': this.props['aria-selected'],
      className: this.props.className,
      style
    }

    return (
      <button {...props}>{this.props.children}</button>
    );

  }

};
