export default function SelectionInViewMixin(Base) {

  return class SelectionInView extends Base {

    componentDidMount() {
      if (super.componentDidMount) { super.componentDidMount(); }
      this.scrollSelectionIntoView();
    }

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
  };
}
