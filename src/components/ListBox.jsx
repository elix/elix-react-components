import classnames from 'classnames';
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

  get defaults() {
    return Object.assign({}, super.defaults, {
      orientation: 'vertical'
    });
  }

  itemProps(item, index) {
    const base = super.itemProps ? super.itemProps(item, index) : {};
    const baseStyle = base.style || {};
    const itemStyle = {
      'padding': '0.25em',
    };
    const selectedStyle = {
      'background': 'highlight',
      'color': 'highlighttext'
    };
    const selected = index === this.state.selectedIndex;
    const style = Object.assign(
      {},
      baseStyle,
      itemStyle,
      selected && selectedStyle
    );
    const className = classnames(
      item.props.className,
      base.className,
      {
        selected
      }
    );
    return Object.assign(
      {},
      base,
      {
        className,
        style
      }
    );
  }

  rootProps() {
    const base = super.rootProps ? super.rootProps() : {};
    const horizontalStyle = this.orientation() === "horizontal" ?
      {
        'flexDirection': 'row',
        'overflowX': 'scroll',
        'overflowY': 'hidden'
      } :
      {};
    const style = Object.assign({}, base.style, {
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
    }, horizontalStyle);
    return Object.assign({}, base, { style });
  }

}
