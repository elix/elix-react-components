import React from 'react';
import ReactDOM from 'react-dom';


export default function ListMixin(Base) {

  return class List extends Base {

    get defaults() {
      return Object.assign({}, super.defaults, {
        orientation: 'both'
      });
    }

    /**
     * Return the index of the list child that is, or contains, the indicated target
     * node. Return -1 if not found.
     */
    indexOfTarget(target) {
      const children = this.root.children;
      for (let index = 0; index < children.length; index++) {
        const child = children[index];
        if (child.contains(target)) {
          return index;
        }
      }
      return -1;
    }

    itemProps(item, index) {
      return super.itemProps ? super.itemProps(item, index) : {};
    }

    get items() {
      // Prefer base result if defined. If undefined, the default implementation
      // returns the component's children.
      return super.items || this.props.items || this.props.children;
    }

    // Default orientation is both horizontal and vertical. Override with
    // "horizontal" or "vertical" if you only want a specific orientation.
    get orientation() {
      return this.props.orientation || this.defaults.orientation;
    }

    /**
     * Default render function for a list applies rootProps to a root div
     * element, and the itemProps to the component's items.
     */
    render() {

      const rootProps = this.rootProps();

      // Merge style set on this component on top of default style.
      Object.assign(
        rootProps.style,
        this.props.style
      );

      const items = this.renderItems();

      return (
        <div ref={el => this.root = el} {...rootProps}>
          {items}
        </div>
      );
    }

    renderItems() {
      return this.items.map((item, index) => {
        const itemProps = this.itemProps(item, index);
        if (!itemProps.key) {
          itemProps.key = index;
        }
        return React.cloneElement(item, itemProps);
      });
    }

    rootProps() {
      return super.rootProps ? super.rootProps() : {};
    }

  };
}
