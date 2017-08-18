import React from 'react';
import ReactDOM from 'react-dom';

import DirectionSelectionMixin from '../../src/mixins/DirectionSelectionMixin';
import KeyboardDirectionMixin from '../../src/mixins/KeyboardDirectionMixin';
import KeyboardMixin from '../../src/mixins/KeyboardMixin';
import SlidingViewport from '../../src/components/SlidingViewport';
import SelectionAriaMixin from '../../src/mixins/SelectionAriaMixin';


const Base = 
  DirectionSelectionMixin(
  KeyboardDirectionMixin(
  KeyboardMixin(
  SelectionAriaMixin(
    SlidingViewport
  ))));


class SlidingViewportDemo extends Base {}


export default () => (
  <SlidingViewportDemo style={{ height: '100%' }} aria-label="Nature scenes">
    <img src="images/image1.jpg" alt="Lake"/>
    <img src="images/image2.jpg" alt="Horses"/>
    <img src="images/image3.jpg" alt="Ladybug on wheat"/>
    <img src="images/image4.jpg" alt="Mountain"/>
    <img src="images/image5.jpg" alt="Palm tree"/>
  </SlidingViewportDemo>
);
