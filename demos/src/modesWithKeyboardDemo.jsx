import React from 'react';
import ReactDOM from 'react-dom';

import DirectionSelectionMixin from '../../src/mixins/DirectionSelectionMixin.js';
import KeyboardDirectionMixin from '../../src/mixins/KeyboardDirectionMixin.js';
import KeyboardMixin from '../../src/mixins/KeyboardMixin.js';
import Modes from '../../src/components/Modes.jsx';
import SelectionAriaMixin from '../../src/mixins/SelectionAriaMixin.js';


class ModesWithKeyboard extends
  DirectionSelectionMixin(
  KeyboardDirectionMixin(
  KeyboardMixin(
  SelectionAriaMixin(
    Modes
  )))) {}


export default () => {  
  const style = {
    'border': '1px solid gray',
    'height': '100%',
    'width': '100%'
  };
  return (
    <ModesWithKeyboard aria-label="Panels" style={style}>
      <div className="panel">One</div>
      <div className="panel">Two</div>
      <div className="panel">Three</div>
    </ModesWithKeyboard>
  );
}
