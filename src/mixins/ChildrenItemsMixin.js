import React from 'react';
import ReactDOM from 'react-dom';


export default function ChildrenItemsMixin(Base) {
  return class ChildrenItems extends Base {
    get items() {
      return this.props.children;
    }
  };
}
