import React from 'react';
import ReactDOM from 'react-dom';

import DialogModalityMixin from '../mixins/DialogModalityMixin';
import KeyboardMixin from '../mixins/KeyboardMixin';
import OverlayMixin from '../mixins/OverlayMixin';


const Base =
  DialogModalityMixin(
  KeyboardMixin(
  OverlayMixin(
    React.Component
  )));


export default class Dialog extends Base {}
