import React from 'react';
import ReactDOM from 'react-dom';


export default function ListMixin(Base) {
  return class List extends Base {

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
