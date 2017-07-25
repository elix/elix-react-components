import React from 'react';
import ReactDOM from 'react-dom';


export default function ListMixin(Base) {
  return class List extends Base {

    constructor(props) {
      super(props);
      this.listBag = this.listProps();
      this.itemBag = this.itemProps();
      const selectedItemBag = this.selectedItemProps();
      const itemStyle = this.itemBag.style;
      const selectedItemStyle = Object.assign({}, itemStyle, selectedItemBag.style);
      this.selectedItemBag = Object.assign({}, this.itemBag, selectedItemBag, { style: selectedItemStyle });
    }

    render() {
      const items = this.items.map((item, index) => {
        const bag = index === this.state.selectedIndex ?
          this.selectedItemBag :
          this.itemBag;
        bag.key = index;
        return React.cloneElement(item, bag);
      });
      return (
        <div {...this.listBag} ref={el => this.root = el}>
          {items}
        </div>
      );
    }

  };
}
