import React from 'react';
import ReactDOM from 'react-dom';

import ChildrenItemsMixin from '../mixins/ChildrenItemsMixin';
import ListMixin from '../mixins/ListMixin';
import SingleSelectionMixin from '../mixins/SingleSelectionMixin';


const Base =
  ChildrenItemsMixin(
  ListMixin(
  SingleSelectionMixin(
    React.Component
  )));


export default class Modes extends Base {

  constructor(props) {
    super(props);
    if (this.state.selectedIndex == null || this.state.selectedIndex === -1) {
      this.state = Object.assign({}, this.state, {
        selectedIndex: 0
      });
    }
  }

  itemProps(item, index) {
    const base = super.itemProps ? super.itemProps(item, index) : {};
    const baseStyle = base.style || {};
    const display = index === this.state.selectedIndex ? '' : 'none';
    const style = Object.assign({}, baseStyle, { display });
    return Object.assign({}, base, { style });
  }

  listProps() {
    const base = super.listProps ? super.listProps() : {};
    const style = Object.assign(
      {},
      base.style,
      {
        'display': 'inline-block'
      },
      this.props.style);
    return Object.assign({}, base, { style });
  }

}
