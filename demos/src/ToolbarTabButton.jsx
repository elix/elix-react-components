import React from 'react';
import ReactDOM from 'react-dom';


// Define a custom tab button for use with Tabs / TabStrip.
export default class ToolbarTabButton extends React.Component {

  render() {

    const selected = this.props.selected;
    const selectedStyle = {
      'color': 'dodgerblue'
    }

    const style = Object.assign(
      {},
      this.props.style,
      {
        'alignItems': 'center',
        'background': 'transparent',
        'border': 'none',
        'color': 'inherit',
        'display': 'flex',
        'flex': '1',
        'flexDirection': 'column',
        'outline': 'none',
        'padding': '6px',
        'WebkitTapHighlightColor': 'transparent'
      },
      selected && selectedStyle
    );

    const props = {
      'aria-selected': this.props['aria-selected'],
      className: this.props.className,
      style
    };

    return (
      <button {...props}>
        {props.children}
      </button>
    );
  }

}
