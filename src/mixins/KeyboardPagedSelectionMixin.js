export default function KeyboardPagedSelectionMixin(Base) {

  return class KeyboardPagedSelection extends Base {

    keydown(event) {
      let handled = false;
      const orientation = this.orientation ? this.orientation() : 'both';
      if (orientation !== 'horizontal') {
        switch (event.keyCode) {
          case 33: // Page Up
            handled = this.pageUp();
            break;

          case 34: // Page Down
            handled = this.pageDown();
            break;
        }
      }

      // Prefer mixin result if it's defined, otherwise use base result.
      return handled || (super.keydown && super.keydown(event));
    }

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

  };
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
    return component.selectedIndexChanged(newIndex);
  }
  else {
    return false; // We didn't do anything.
  }
}
