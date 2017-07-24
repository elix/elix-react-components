import React from 'react';
import ReactDOM from 'react-dom';

import constants from '../mixins/constants.js';


// Symbols for private data members on an element.
const itemTextContentsKey = Symbol('itemTextContents');
const typedPrefixKey = Symbol('typedPrefix');
const prefixTimeoutKey = Symbol('prefixTimeout');
const settingSelectionKey = Symbol('settingSelection');




export default class ListBox extends React.Component {
  
  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.state = Object.assign({}, this.state, {
      selectedIndex: parseInt(this.props.selectedIndex || -1)
    });
  }

  itemProps(item, index) {
    // const base = super.itemProps ? super.itemProps(item, index) : {};
    const base = {
      'aria-selected': index === this.state.selectedIndex,
      role: 'option'
    }
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
    // const base = super.listProps ? super.listProps() : {};
    const base = {
      // ClickSelectionMixin
      onClick: this.click,
      // KeyboardMixin
      onKeyDown: this.handleKeydown,
      tabIndex: this.props.tabIndex || 0,
      'aria-label': this.props['aria-label'],
      role: 'listbox'
    };
    const baseStyle = Object.assign({}, this.props.style, base.style);
    const horizontalStyle = this.props.orientation === "horizontal" ?
      {
        'flexDirection': 'row',
        'overflowX': 'scroll',
        'overflowY': 'hidden'
      } :
      {};
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
    }, horizontalStyle);
    return Object.assign({}, base, { style });
  }
  
  // ListMixin
  render() {
    // console.log(`render`);
    const items = this.items.map((item, index) => {
      const itemProps = Object.assign({}, {
        key: index
      }, this.itemProps(item, index));
      return React.cloneElement(item, itemProps);
    });
    return (
      <div {...this.listProps()} ref={el => this.root = el}>
        {items}
      </div>
    );
  }
  
  // ChildrenItemsMixin
  get items() {
    return this.props.children;
  }

  // ClickSelectionMixin
  click(event) {
    // REVIEW: is this the best way to reliably map the event target to a
    // child?
    const parent = event.target.parentNode;
    const targetIndex = [].indexOf.call(parent.children, event.target);
    if (targetIndex >= 0) {
      this.setState((prevState, props) => {
        return {
          selectedIndex: targetIndex
        }
      });
    }
  }

  // DirectionSelectionMixin
  goDown() {
    if (super.goDown) { return super.goDown(); }
    return this.selectNext();
  }

  goEnd() {
    if (super.goEnd) { return super.goEnd(); }
    return this.selectLast();
  }

  goLeft() {
    if (super.goLeft) { return super.goLeft(); }
    return this.selectPrevious();      
  }

  goRight() {
    if (super.goRight) { return super.goRight(); }
    return this.selectNext();
  }

  goStart() {
    if (super.goStart) { return super.goStart(); }
    return this.selectFirst();
  }

  goUp() {
    if (super.goUp) { return super.goUp(); }
    return this.selectPrevious();
  }

  // KeyboardDirectionMixin
    keydown(event) {
      let handled = false;
      let resetPrefix = true;

      const orientation = this.props.orientation || 'both';
      const horizontal = (orientation === 'horizontal' || orientation === 'both');
      const vertical = (orientation === 'vertical' || orientation === 'both');

      // Ignore Left/Right keys when metaKey or altKey modifier is also pressed,
      // as the user may be trying to navigate back or forward in the browser.
      switch (event.keyCode) {

        case 8: // Backspace
          handleBackspace(this);
          handled = true;
          resetPrefix = false;
          break;

        case 27: // Escape
          handled = true;
          break;
          case 33: // Page Up
            handled = this.pageUp();
            break;

          case 34: // Page Down
            handled = this.pageDown();
            break;

        case 35: // End
          handled = this.goEnd();
          break;

        case 36: // Home
          handled = this.goStart();
          break;

        case 37: // Left
          if (horizontal && !event.metaKey && !event.altKey) {
            handled = this.goLeft();
          }
          break;

        case 38: // Up
          if (vertical) {
            handled = event.altKey ? this.goStart() : this.goUp();
          }
          break;

        case 39: // Right
          if (horizontal && !event.metaKey && !event.altKey) {
            handled = this.goRight();
          }
          break;

        case 40: // Down
          if (vertical) {
            handled = event.altKey ? this.goEnd() : this.goDown();
          }
          break;

        default:
          if (!event.ctrlKey && !event.metaKey && !event.altKey &&
              event.which !== 32 /* Space */) {
            handlePlainCharacter(this, String.fromCharCode(event.keyCode));
          }
          resetPrefix = false;
      }

      if (resetPrefix) {
        resetTypedPrefix(this);
      }

      // Prefer mixin result if it's defined, otherwise use base result.
      return handled || (super.keydown && super.keydown(event)) || false;
    }

  // KeyboardPagedEvent
    /**
     * Scroll down one page.
     */
    pageDown() {
      if (super.pageDown) { super.pageDown(); }
      return scrollOnePage(this, true);
    }

    /**
     * Scroll up one page.
     */
    pageUp() {
      if (super.pageUp) { super.pageUp(); }
      return scrollOnePage(this, false);
    }

    /* Provide a default scrollTarget implementation if none exists. */
    get scrollTarget() {
      return super.scrollTarget || this.root;
    }
    
    // KeyboardMixin
    handleKeydown(event) {
      const handled = this.keydown(event);
      if (handled) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
    
    // KeyboardPrefixSelectionMixin
    componentDidMount() {
      if (super.componentDidMount) { super.componentDidMount(); }
      resetTypedPrefix(this);
      this.scrollSelectionIntoView();
    }

    // Default implementation returns an item's `alt` attribute or its
    // `textContent`, in that order.
    getItemText(item) {
      return item.getAttribute('alt') || item.textContent;
    }


    /**
     * Select the first item whose text content begins with the given prefix.
     *
     * @param {string} prefix - The prefix string to search for
     * @returns {boolean}
     */
    selectItemWithTextPrefix(prefix) {
      if (super.selectItemWithTextPrefix) { super.selectItemWithTextPrefix(prefix); }
      if (prefix == null || prefix.length === 0) {
        return false;
      }
      const index = getIndexOfItemWithTextPrefix(this, prefix);
      if (index >= 0) {
        this.setState({
          selectedIndex: index
        });
        return true;
      } else {
        return false;
      }
    }
    
    // SelectionInViewMixin
    componentDidUpdate() {
      if (super.componentDidUpdate) { super.componentDidUpdate(); }
      this.scrollSelectionIntoView();
    }

    scrollSelectionIntoView() {
      if (super.scrollSelectionIntoView) { super.scrollSelectionIntoView(); }

      const scrollTarget = this.scrollTarget;
      const selectedIndex = this.state.selectedIndex;
      if (selectedIndex < 0) {
        return;
      }

      const selectedItem = this.root.children[selectedIndex];

      // Determine the bounds of the scroll target and item. We use
      // getBoundingClientRect instead of .offsetTop, etc., because the latter
      // round values, and we want to handle fractional values.
      const scrollTargetRect = scrollTarget.getBoundingClientRect();
      const itemRect = selectedItem.getBoundingClientRect();

      // Determine how far the item is outside the viewport.
      const bottomDelta = itemRect.bottom - scrollTargetRect.bottom;
      const topDelta = itemRect.top - scrollTargetRect.top;
      const leftDelta = itemRect.left - scrollTargetRect.left;
      const rightDelta = itemRect.right - scrollTargetRect.right;

      // Scroll the target as necessary to bring the item into view.
      if (bottomDelta > 0) {
        scrollTarget.scrollTop += bottomDelta;            // Scroll down
      } else if (topDelta < 0) {
        scrollTarget.scrollTop += Math.ceil(topDelta);    // Scroll up
      }
      if (rightDelta > 0) {
        scrollTarget.scrollLeft += rightDelta;            // Scroll right
      } else if (leftDelta < 0) {
        scrollTarget.scrollLeft += Math.ceil(leftDelta);  // Scroll left
      }
    }

    get scrollTarget() {
      return super.scrollTarget || this.root;
    }
    

    // SingleSelectionMixin
    selectFirst() {
      if (super.selectFirst) { super.selectFirst(); }
      return updateSelectedIndex(this, Math.min(0, this.items.length - 1));
    }

    selectLast() {
      if (super.selectLast) { super.selectLast(); }
      return updateSelectedIndex(this, this.items.length - 1);
    }

    selectNext() {
      if (super.selectNext) { super.selectNext(); }
      return updateSelectedIndex(this, Math.min(this.state.selectedIndex + 1, this.items.length - 1));
    }

    selectPrevious() {
      if (super.selectPrevious) { super.selectPrevious(); }
      return updateSelectedIndex(this, Math.max(this.state.selectedIndex - 1, 0));
    }

/***************/
}

/**
 * Return the item whose content spans the given y position (relative to the
 * top of the list's scrolling client area), or null if not found.
 * 
 * If downward is true, move down the list of items to find the first item
 * found at the given y position; if downward is false, move up the list of
 * 
 * items to find the last item at that position.
 */
function getIndexOfItemAtY(items, scrollTarget, y, downward) {

  const start = downward ? 0 : items.length - 1;
  const end = downward ? items.length : 0;
  const step = downward ? 1 : -1;

  const topOfClientArea = scrollTarget.offsetTop + scrollTarget.clientTop;

  // Find the item spanning the indicated y coordinate.
  let item;
  let itemIndex = start;
  let itemTop;
  let found = false;
  while (itemIndex !== end) {
    item = items[itemIndex];
    itemTop = item.offsetTop - topOfClientArea;
    const itemBottom = itemTop + item.offsetHeight;
    if (itemTop <= y && itemBottom >= y) {
      // Item spans the indicated y coordinate.
      found = true;
      break;
    }
    itemIndex += step;
  }

  if (!found) {
    return null;
  }

  // We may have found an item whose padding spans the given y coordinate,
  // but whose content is actually above/below that point.
  // TODO: If the item has a border, then padding should be included in
  // considering a hit.
  const itemStyle = getComputedStyle(item);
  const itemPaddingTop = itemStyle.paddingTop ? parseFloat(itemStyle.paddingTop) : 0;
  const itemPaddingBottom = itemStyle.paddingBottom ? parseFloat(itemStyle.paddingBottom) : 0;
  const contentTop = itemTop + item.clientTop + itemPaddingTop;
  const contentBottom = contentTop + item.clientHeight - itemPaddingTop - itemPaddingBottom;
  if (downward && contentTop <= y || !downward && contentBottom >= y) {
    // The indicated coordinate hits the actual item content.
    return itemIndex;
  }
  else {
    // The indicated coordinate falls within the item's padding. Back up to
    // the item below/above the item we found and return that.
    return itemIndex - step;
  }
}

/**
 * Move by one page downward (if downward is true), or upward (if false).
 * Return true if we ended up changing the selection, false if not.
 */
function scrollOnePage(component, downward) {
  
  const scrollTarget = component.scrollTarget;
  const items = component.root.children;
  const selectedIndex = component.state.selectedIndex;

  // Determine the item visible just at the edge of direction we're heading.
  // We'll select that item if it's not already selected.
  const edge = scrollTarget.scrollTop + (downward ? scrollTarget.clientHeight : 0);
  const indexOfItemAtEdge = getIndexOfItemAtY(items, scrollTarget, edge, downward);

  let newIndex;
  if (indexOfItemAtEdge && selectedIndex === indexOfItemAtEdge) {
    // The item at the edge was already selected, so scroll in the indicated
    // direction by one page. Leave the new item at that edge selected.
    const delta = (downward ? 1 : -1) * scrollTarget.clientHeight;
    newIndex = getIndexOfItemAtY(items, scrollTarget, edge + delta, downward);
  }
  else {
    // The item at the edge wasn't selected yet. Instead of scrolling, we'll
    // just select that item. That is, the first attempt to page up/down
    // usually just moves the selection to the edge in that direction.
    newIndex = indexOfItemAtEdge;
  }

  if (!newIndex) {
    // We can't find an item in the direction we want to travel. Select the
    // last item (if moving downward) or first item (if moving upward).
    newIndex = (downward ? items.length - 1 : 0);
  }

  if (newIndex !== selectedIndex) {
    component.setState({
      selectedIndex: newIndex
    });
    return true; // We scrolled.
  }
  else {
    return false; // We didn't do anything.
  }
}

// Return the index of the first item with the given prefix, else -1.
function getIndexOfItemWithTextPrefix(component, prefix) {
  const itemTextContents = getItemTextContents(component);
  const prefixLength = prefix.length;
  for (let i = 0; i < itemTextContents.length; i++) {
    const itemTextContent = itemTextContents[i];
    if (itemTextContent.substr(0, prefixLength) === prefix) {
      return i;
    }
  }
  return -1;
}

// Return an array of the text content (in lowercase) of all items.
// Cache these results.
function getItemTextContents(component) {
  if (!component[itemTextContentsKey]) {
    const items = component.root.children;
    component[itemTextContentsKey] = Array.prototype.map.call(items, item => {
      const text = component.getItemText(item);
      return text.toLowerCase();
    });
  }
  return component[itemTextContentsKey];
}

// Handle the Backspace key: remove the last character from the prefix.
function handleBackspace(element) {
  const length = element[typedPrefixKey] ? element[typedPrefixKey].length : 0;
  if (length > 0) {
    element[typedPrefixKey] = element[typedPrefixKey].substr(0, length - 1);
  }
  element.selectItemWithTextPrefix(element[typedPrefixKey]);
  setPrefixTimeout(element);
}

// Add a plain character to the prefix.
function handlePlainCharacter(element, char) {
  const prefix = element[typedPrefixKey] || '';
  element[typedPrefixKey] = prefix + char.toLowerCase();
  element.selectItemWithTextPrefix(element[typedPrefixKey]);
  setPrefixTimeout(element);
}

// Stop listening for typing.
function resetPrefixTimeout(element) {
  if (element[prefixTimeoutKey]) {
    clearTimeout(element[prefixTimeoutKey]);
    element[prefixTimeoutKey] = false;
  }
}

// Clear the prefix under construction.
function resetTypedPrefix(element) {
  element[typedPrefixKey] = '';
  resetPrefixTimeout(element);
}

// Wait for the user to stop typing.
function setPrefixTimeout(element) {
  resetPrefixTimeout(element);
  element[prefixTimeoutKey] = setTimeout(() => {
    resetTypedPrefix(element);
  }, constants.TYPING_TIMEOUT_DURATION);
}

function updateSelectedIndex(component, newIndex) {
  const changed = component.state.selectedIndex !== newIndex;
  if (changed) {
    component.setState((prevState, props) => {
      return {
        selectedIndex: newIndex
      };
    });
  }
  return changed;
}
