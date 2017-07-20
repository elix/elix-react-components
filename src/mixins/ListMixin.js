import React from 'react';
import ReactDOM from 'react-dom';


export default function ListMixin(Base) {
  return class List extends Base {

    render() {
      const children = React.Children.map(this.props.children, (child, index) => {
        const itemProps = this.itemProps(child, index);
        return React.cloneElement(child, itemProps);
      });
      return (
        <div {...this.listProps()}>
          {children}
        </div>
      );
    }

  }
}
