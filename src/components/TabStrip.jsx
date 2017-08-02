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
      selectionRequired: true,
      tabAlign: 'start',
      tabIndex: null,
      tabPosition: 'top'
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

    const itemStyle = {
      'background': 'white',
      'border': '1px solid #ccc',
      'cursor': 'pointer',
      'fontFamily': 'inherit',
      'fontSize': 'inherit',
      'margin': '0',
      // 'outline': 'none',
      'padding': '0.5em 0.75em',
      'position': 'relative',
      'WebkitTapHighlightColor': 'transparent',
      'transition': 'border-color 0.25s'
    };
    
    const tabPosition = this.props.tabPosition || this.defaults.tabPosition;
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

    const tabAlign = this.props.tabAlign || this.defaults.tabAlign;
    const alignStyle = tabAlign === 'stretch' && {
      'flex': 1
    };

    const needsSpacer = index > 0;
    const spacerStyle = tabPosition === 'top' || tabPosition === 'bottom' ?
      {
        'marginLeft': '0.2em'
      } :
      {
        'marginTop': '0.2em'
      };

    const selected = index === this.state.selectedIndex;

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

    let className = base.className || '';
    if (selected) {
      if (className.length > 0) {
        className += ' ';
      }
      className += 'selected';
    }

    const style = Object.assign(
      {},
      base.style,
      itemStyle,
      positionStyle,
      alignStyle,
      needsSpacer && spacerStyle,
      selected && selectedStyle
    );
    return Object.assign(
      {},
      base,
      {
        'aria-selected': selected,
        className,
        role,
        style
      }
    );
  }

  listProps() {
    const base = super.listProps ? super.listProps() : {};
    
    const tabPosition = this.props.tabPosition || this.defaults.tabPosition;
    const lateralPosition = tabPosition === 'left' || tabPosition === 'right';
    const lateralStyle = {
      'flexDirection': 'column'
    };

    const tabAlign = this.props.tabAlign || this.defaults.tabAlign;
    const alignStyles = {
      'center': {
        'justifyContent': 'center'
      },
      'end': {
        'justifyContent': 'flex-end'
      },
      'start': {
        'justifyContent': 'flex-start'
      }
      // No style needed for "stretch"
    };
    const alignStyle = alignStyles[tabAlign];

    const style = Object.assign(
      {},
      base.style,
      {
        'display': 'flex',
      },
      lateralPosition && lateralStyle,
      alignStyle,
      this.props.style
    );
    const role = 'tablist';
    return Object.assign({}, base, {
      role,
      style
    });
  }

  // TabStrip orientation depends on tabPosition property.
  orientation() {
    const tabPosition = this.props.tabPosition || this.defaults.tabPosition;
    return tabPosition === 'top' || tabPosition === 'bottom' ?
      'horizontal' :
      'vertical';
  }

}
