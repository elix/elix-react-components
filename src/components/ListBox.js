import React from 'react';
import ReactDOM from 'react-dom';

import ChildrenItemsMixin from '../mixins/ChildrenItemsMixin';
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
  ChildrenItemsMixin(
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
  )))))))))));


export default class ListBox extends Base {

  itemProps() {
    const base = super.itemProps ? super.itemProps() : {};
    const baseStyle = base.style || {};
    const style = Object.assign({}, baseStyle, {
      'padding': '0.25em',
    });
    return Object.assign({}, base, { style });
  }

  listProps() {
    const base = super.listProps ? super.listProps() : {};
    const baseStyle = Object.assign({}, base.style, this.props.style);
    const style = Object.assign({}, baseStyle, {
      'border': '1px solid gray',
      'boxSizing': 'border-box',
      'cursor': 'default',
      'display': 'flex',
      'flexDirection': 'column',
      'overflowX': 'hidden',
      'overflowY': 'scroll',
      'WebkitOverflowScrolling': 'touch', /* for momentum scrolling */
      'WebkitTapHighlightColor': 'rgba(0, 0, 0, 0)',
      'WebkitUserSelect': 'none',
      'MozUserSelect': 'none',
      'msUserSelect': 'none',
      'UserSelect': 'none'
    });
    // const horizontalStyle = this.props.orientation === "horizontal" ?
    //   {
    //     'flexDirection': 'row',
    //     'overflowX': 'scroll',
    //     'overflowY': 'hidden'
    //   } :
    //   {};
    return Object.assign({}, base, { style });
    // return listBag;
  }

  selectedItemProps() {
    const base = super.selectedItemProps ? super.selectedItemProps() : {};
    const baseStyle = base.style || {};
    const style = Object.assign({}, baseStyle, {
      'background': 'highlight',
      'color': 'highlighttext'
    });
    return Object.assign({}, base, { style });
  }

}
