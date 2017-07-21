import React from 'react';
import ReactDOM from 'react-dom';

import ClickSelectionMixin from '../mixins/ClickSelectionMixin';
import DirectionSelectionMixin from '../mixins/DirectionSelectionMixin';
import KeyboardDirectionMixin from '../mixins/KeyboardDirectionMixin';
import KeyboardPagedSelectionMixin from '../mixins/KeyboardPagedSelectionMixin';
import KeyboardPrefixSelectionMixin from '../mixins/KeyboardPrefixSelectionMixin';
import KeyboardMixin from '../mixins/KeyboardMixin';
import ListMixin from '../mixins/ListMixin';
import SelectionAriaMixin from '../mixins/SelectionAriaMixin';
import SelectionInViewMixin from '../mixins/SelectionInViewMixin';
import SingleSelectionMixin from '../mixins/SingleSelectionMixin';


const Base =
  ClickSelectionMixin(
  DirectionSelectionMixin(
  KeyboardMixin(
  KeyboardDirectionMixin(
  KeyboardPagedSelectionMixin(
  KeyboardPrefixSelectionMixin(
  ListMixin(
  SelectionAriaMixin(
  SelectionInViewMixin(
  SingleSelectionMixin(
    React.Component
  ))))))))));


export default class ListBox extends Base {

  itemProps(item, index) {
    const base = super.itemProps ? super.itemProps(item, index) : {};
    const baseStyle = base.style || {};
    let selectedStyle = index === this.state.selectedIndex ?
      {
        'background': 'highlight',
        'color': 'highlighttext'
      } :
      {};
    let style = Object.assign({}, baseStyle, selectedStyle, {
      'cursor': 'default',
      'padding': '0.25em',
      'WebkitUserSelect': 'none',
      'MozUserSelect': 'none',
      'msUserSelect': 'none',
      'UserSelect': 'none'
    });
    return Object.assign({}, base, { style });
  }

  listProps() {
    const base = super.listProps ? super.listProps() : {};
    const baseStyle = Object.assign({}, this.props.style, base.style);
    const style = Object.assign({}, baseStyle, {
      'border': '1px solid gray',
      'boxSizing': 'border-box',
      'cursor': 'default',
      'display': 'flex',
      'flexDirection': 'column',
      'overflowX': 'hidden',
      'overflowY': 'scroll',
      'WebkitOverflowScrolling': 'touch', /* for momentum scrolling */
      'WebkitTapHighlightColor': 'rgba(0, 0, 0, 0)'
    });
    return Object.assign({}, base, {
      style
    });
  }

}
