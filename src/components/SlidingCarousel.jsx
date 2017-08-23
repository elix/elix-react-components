import React from 'react';
import ReactDOM from 'react-dom';

import DirectionSelectionMixin from '../../src/mixins/DirectionSelectionMixin';
import KeyboardDirectionMixin from '../../src/mixins/KeyboardDirectionMixin';
import KeyboardMixin from '../../src/mixins/KeyboardMixin';
import SlidingViewport from '../../src/components/SlidingViewport';
import SelectionAriaMixin from '../../src/mixins/SelectionAriaMixin';
import SwipeDirectionMixin from '../../src/mixins/SwipeDirectionMixin';
import TouchSwipeMixin from '../../src/mixins/TouchSwipeMixin';
import TrackpadSwipeMixin from '../../src/mixins/TrackpadSwipeMixin';


const Base =
  DirectionSelectionMixin(
  KeyboardDirectionMixin(
  KeyboardMixin(
  SelectionAriaMixin(
  SwipeDirectionMixin(
  TouchSwipeMixin(
  TrackpadSwipeMixin(
    SlidingViewport
  )))))));


export default class SlidingCarousel extends Base {}
