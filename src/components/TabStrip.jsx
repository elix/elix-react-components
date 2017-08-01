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

  componentDidUpdate() {
    if (super.componentDidUpdate) { super.componentDidUpdate(); }

    // If the selectedIndex changes due to keyboard action within this
    // component, the old tab button might still have focus. Ensure the new
    // selected tab button has the focus.
    // REVIEW: Feels weird to be using both this.root.children and this.items.
    const selectedChild = this.root.children[this.state.selectedIndex];
    if (this.root.contains(document.activeElement) &&
         selectedChild !== document.activeElement) {
      selectedChild.focus();
    }
  }

  get defaults() {
    return Object.assign({}, super.defaults, {
      orientation: 'horizontal',
      tabIndex: null
    });
  }

  keydown(event) {

    let handled;

    // Let user select a tab button with Enter or Space.
    switch (event.keyCode) {
      case 13: /* Enter */
      case 32: /* Space */
        const index = this.indexOfTarget(event.target);
        if (index !== this.selectedIndex) {
          this.selectedIndexChanged(index);
          handled = true;
        }
        break;
    }

    // Prefer mixin result if it's defined, otherwise use base result.
    return handled || (super.keydown && super.keydown(event)) || false;
  }

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
      // 'outline': 'none',
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
        'aria-selected': selected,
        role,
        style
      }
    );
  }

  listProps() {
    const base = super.listProps ? super.listProps() : {};
    const baseStyle = Object.assign({}, base.style, this.props.style);
    const role = 'tablist';
    const style = Object.assign({}, baseStyle, {
      'display': 'flex',
    });
    return Object.assign({}, base, {
      role,
      style
    });
  }

}
