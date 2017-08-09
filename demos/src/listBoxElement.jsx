import React from 'react';
import ReactDOM from 'react-dom';
import ListBox from '../../src/components/ListBox.jsx';


class ListBoxElement extends HTMLElement {

  constructor() {
    super();
    this._observer = new MutationObserver(() => {
      this.render();
    });
    this._observer.observe(this, {
      childList: true
    });
  }

  // attributeChangedCallback(attributeName, oldValue, newValue) {
  //   const propertyName = attributeToPropertyName(attributeName);
  //   // If the attribute name corresponds to a property name, set the property.
  //   if (propertyName in this) {
  //     this[propertyName] = newValue;
  //   }
  // }

  render() {

    // const onlyChild = this.children.length === 1 ?
    //   this.children[0] :
    //   null;
    // if (onlyChild === this._root) {
    //   // The mutation is in response to our own rendering.
    //   return;
    // }

    const items = [...this.children].map((item, index) => {
      // TODO: Handle arbitrary children.
      const element = React.createElement(item.localName, {
        key: index
      }, item.textContent);
      return element;
    });

    // Pluck off attributes
    const props = {};
    [...this.attributes].forEach(attribute => {
      const propertyName = attributeToPropertyName(attribute.name);
      props[propertyName] = attribute.value;
      this.removeAttributeNode(attribute);
    });

    const tree = (
      <ListBox {...props} style={{ height: '100%' }}>
        {items}
      </ListBox>
    );
    ReactDOM.render(tree, this);

    // this._root = this.children[0];
    this._observer.disconnect();
  }

}


function attributeToPropertyName(attributeName) {
  const hyphenRegEx = /-([a-z])/g;
  const propertyName = attributeName.replace(hyphenRegEx,
    match => match[1].toUpperCase());
  return propertyName;
}


// Don't try to define the element on older browsers if the polyfill isn't
// loaded.
if (window.customElements && window.customElements.define) {
  customElements.define('elix-list-box', ListBoxElement);
}
