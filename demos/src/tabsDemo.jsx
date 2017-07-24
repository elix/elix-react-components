import React from 'react';
import ReactDOM from 'react-dom';
import Tabs from '../../src/components/Tabs';


export default function(root) {

  const demo = (
    <Tabs>
      <div className="panel" aria-label="One">Page one</div>
      <div className="panel" aria-label="Two">Page two</div>
      <div className="panel" aria-label="Three">Page three</div>
    </Tabs>
  );
  
  ReactDOM.render(demo, root);
}
