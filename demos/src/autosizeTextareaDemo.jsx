import React from 'react';
import ReactDOM from 'react-dom';
import AutosizeTextarea from '../../src/components/AutosizeTextarea.jsx';


export default () => (
  <div>
    <p>
      The text area below will grow to contain its contents, unlike a standard
      &lt;textarea&gt; element, which always remains the same height.
    </p>
    <AutosizeTextarea minimumRows={2}>
      Type all you want here!
    </AutosizeTextarea>
  </div>
);
