import React from 'react';
import ReactDOM from 'react-dom';


export default function ListMixin(Base) {
  return class List extends Base {

    render() {
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

  };
}
