import React from 'react';
import ReactDOM from 'react-dom';


export default function ListMixin(Base) {
  return class List extends Base {

    get defaults() {
      return Object.assign({}, super.defaults, {
        orientation: 'both'
      });
    }

    // Default orientation is both horizontal and vertical. Override with
    // "horizontal" or "vertical" if you only want a specific orientation.
    orientation() {
      return this.props.orientation || this.defaults.orientation;
    }

    render() {
      const items = this.items.map((item, index) => {
        const itemProps = this.itemProps(item, index);
        itemProps.key = index;
        return React.cloneElement(item, itemProps);
      });
      return (
        <div {...this.listProps()} ref={el => this.root = el}>
          {items}
        </div>
      );
    }

  };
}
