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

  render() {

    this._observer.disconnect();

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
      props[attribute.name] = attribute.value;
      this.removeAttributeNode(attribute);
    });

    const tree = (
      <ListBox {...props} style={{ height: '100%' }}>
        {items}
      </ListBox>
    );
    ReactDOM.render(tree, this);
  }

}


customElements.define('elix-list-box', ListBoxElement);
