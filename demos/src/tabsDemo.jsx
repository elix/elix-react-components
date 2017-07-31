import React from 'react';
import ReactDOM from 'react-dom';
import Tabs from '../../src/components/Tabs.jsx';


export default function(root) {

  const demo = (
    <Tabs style={{ height: '100%', width: '100%' }}>
      <div className="panel" aria-label="One">Page one</div>
      <div className="panel" aria-label="Two">Page two</div>
      <div className="panel" aria-label="Three">Page three</div>
    </Tabs>
  );
  
  ReactDOM.render(demo, root);
}
