import React from 'react';
import ReactDOM from 'react-dom';
import TabStrip from '../../src/components/TabStrip.jsx';

class Demo extends React.Component {

  render() {
    return (
      <TabStrip>
        <button aria-label="One">One</button>
        <button aria-label="Two">Two</button>
        <button aria-label="Three">Three</button>
      </TabStrip>
    );
  }

}
