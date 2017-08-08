import React from 'react';
import ReactDOM from 'react-dom';
import TabButton from '../../src/components/TabButton.jsx';
import TabStrip from '../../src/components/TabStrip.jsx';

export default () => (
  <div>
    <p>
      Using plain <code>button</code> elements as tab buttons:
    </p>
    <TabStrip>
      <button aria-label="One">One</button>
      <button aria-label="Two">Two</button>
      <button aria-label="Three">Three</button>
    </TabStrip>
    <p>
      Using <code>TabButton</code> components as tab buttons:
    </p>
    <TabStrip>
      <TabButton aria-label="One">One</TabButton>
      <TabButton aria-label="Two">Two</TabButton>
      <TabButton aria-label="Three">Three</TabButton>
    </TabStrip>
  </div>
);
