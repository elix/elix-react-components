import React from 'react';
import ReactDOM from 'react-dom';

import ClickSelectionMixin from '../mixins/ClickSelectionMixin';
import DirectionSelectionMixin from '../mixins/DirectionSelectionMixin';
import KeyboardDirectionMixin from '../mixins/KeyboardDirectionMixin';
import KeyboardMixin from '../mixins/KeyboardMixin';
import SelectionAriaMixin from '../mixins/SelectionAriaMixin';
import SingleSelectionMixin from '../mixins/SingleSelectionMixin';


const Base =
  ClickSelectionMixin(
  DirectionSelectionMixin(
  KeyboardMixin(
  KeyboardDirectionMixin(
  SelectionAriaMixin(
  SingleSelectionMixin(
    React.Component
  ))))));


export default class ListBox extends Base {

  itemProps(item, index) {
    const base = super.itemProps ? super.itemProps(item, index) : {};
    const baseStyle = base.style || {};
    let style = Object.assign({}, baseStyle, {
      'cursor': 'default',
      'padding': '0.25em',
      'WebkitUserSelect': 'none',
      'MozUserSelect': 'none',
      'msUserSelect': 'none',
      'UserSelect': 'none'
    });
    if (index === this.state.selectedIndex) {
      style = Object.assign({}, style, {
        'background': 'highlight',
        'color': 'highlighttext'
      });
    }
    return Object.assign({}, base, { style });
  }

  listProps() {
    const base = super.listProps ? super.listProps() : {};
    const style = {
      'border': '1px solid gray',
      'boxSizing': 'border-box',
      'cursor': 'default',
      'display': 'flex',
      'flexDirection': 'column',
      'WebkitTapHighlightColor': 'rgba(0, 0, 0, 0)'
    };
    return Object.assign({}, base, {
      style
    });
  }

  render() {
    const children = React.Children.map(this.props.children, (child, index) => {
      const itemProps = this.itemProps(child, index);
      return React.cloneElement(child, itemProps);
    });
    return (
      <div {...this.listProps()}>
        {children}
      </div>
    );
  }

}
