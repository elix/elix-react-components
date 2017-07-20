import React from 'react';
import ReactDOM from 'react-dom';

import ClickSelectionMixin from '../mixins/ClickSelectionMixin';
import DirectionSelectionMixin from '../mixins/DirectionSelectionMixin';
import KeyboardDirectionMixin from '../mixins/KeyboardDirectionMixin';
import KeyboardMixin from '../mixins/KeyboardMixin';


const Base =
  ClickSelectionMixin(
  DirectionSelectionMixin(
  KeyboardMixin(
  KeyboardDirectionMixin(
    React.Component
  ))));


export default class ListBox extends Base {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: parseInt(this.props.selectedIndex || -1)
    };
  }

  render() {

    const listStyle = {
      'border': '1px solid gray',
      'boxSizing': 'border-box',
      'cursor': 'default',
      'display': 'flex',
      'flexDirection': 'column',
      'WebkitTapHighlightColor': 'rgba(0, 0, 0, 0)'
    };
    const itemStyle = {
      'cursor': 'default',
      'padding': '0.25em',
      'WebkitUserSelect': 'none',
      'MozUserSelect': 'none',
      'msUserSelect': 'none',
      'UserSelect': 'none'
    };
    const selectedStyle = {
      'background': 'highlight',
      'color': 'highlighttext'
    };

    const selectedIndex = this.state.selectedIndex;
    let index = 0;
    const children = React.Children.map(this.props.children, child => {
      const selected = index === selectedIndex;
      const style = selected ?
        Object.assign({}, itemStyle, selectedStyle) :
        itemStyle;
      const className = selected ?
        'selected' :
        '';
      index++;
      return React.cloneElement(child, { style, className });
    });

    return (
      <div onClick={this.click} onKeyDown={this.keydown} tabIndex={this.props.tabIndex || 0} style={listStyle}>
        {children}
      </div>
    );
  }

}
