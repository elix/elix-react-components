import React from 'react';
import ReactDOM from 'react-dom';

import ChildrenItemsMixin from '../mixins/ChildrenItemsMixin';
import ClickSelectionMixin from '../mixins/ClickSelectionMixin';
import DirectionSelectionMixin from '../mixins/DirectionSelectionMixin';
import KeyboardDirectionMixin from '../mixins/KeyboardDirectionMixin';
import KeyboardMixin from '../mixins/KeyboardMixin';
import ListMixin from '../mixins/ListMixin';
import SingleSelectionMixin from '../mixins/SingleSelectionMixin';


const Base =
  ChildrenItemsMixin(
  ClickSelectionMixin(
  DirectionSelectionMixin(
  KeyboardMixin(
  KeyboardDirectionMixin(
  ListMixin(
  SingleSelectionMixin(
    React.Component
  )))))));


export default class TabStrip extends Base {

  itemProps(item, index) {
    const base = super.itemProps ? super.itemProps(item, index) : {};
    const role = 'tab';
    const baseStyle = base.style || {};
    const itemStyle = {
      'background': 'white',
      'border': '1px solid #ccc',
      'borderRadius': '0.25em 0.25em 0 0',
      'cursor': 'pointer',
      'flex': '1',
      'fontFamily': 'inherit',
      'fontSize': 'inherit',
      'margin': '0',
      'marginBottom': '-1px',
      'outline': 'none',
      'padding': '0.5em 0.75em',
      'position': 'relative',
      'WebkitTapHighlightColor': 'transparent',
      'transition': 'border-color 0.25s'
    };
    const spacerStyle = {
      'marginLeft': '0.2em',
    };
    const selectedStyle = {
      'borderBottomColor': 'transparent',
      'opacity': '1'
    };
    const selected = index === this.state.selectedIndex;
    const style = Object.assign(
      {},
      baseStyle,
      itemStyle,
      index > 0 && spacerStyle,
      selected && selectedStyle
    );
    return Object.assign(
      {},
      base,
      {
        role,
        style
      }
    );
  }

  listProps() {
    const base = super.listProps ? super.listProps() : {};
    const baseStyle = Object.assign({}, base.style, this.props.style);
    const role = 'none';
    const style = Object.assign({}, baseStyle, {
      'display': 'flex',
    });
    return Object.assign({}, base, {
      role,
      style
    });
  }

  orientation() {
    return this.props.orientation || 'horizontal';
  }

}
