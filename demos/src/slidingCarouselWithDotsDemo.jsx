import React from 'react';
import ReactDOM from 'react-dom';


import ArrowSelectionMixin from '../../src/mixins/ArrowSelectionMixin';
import DirectionSelectionMixin from '../../src/mixins/DirectionSelectionMixin';
import KeyboardDirectionMixin from '../../src/mixins/KeyboardDirectionMixin';
import KeyboardMixin from '../../src/mixins/KeyboardMixin';
import ListMixin from '../../src/mixins/ListMixin';
import PageDotsMixin from '../../src/mixins/PageDotsMixin';
import SelectionAriaMixin from '../../src/mixins/SelectionAriaMixin';
import SingleSelectionMixin from '../../src/mixins/SingleSelectionMixin';
import SlidingViewport from '../../src/components/SlidingViewport';
import SwipeDirectionMixin from '../../src/mixins/SwipeDirectionMixin';
import TouchSwipeMixin from '../../src/mixins/TouchSwipeMixin';
import TrackpadSwipeMixin from '../../src/mixins/TrackpadSwipeMixin';


const Base =
  ArrowSelectionMixin(
  DirectionSelectionMixin(
  KeyboardDirectionMixin(
  KeyboardMixin(
  ListMixin(
  PageDotsMixin(
  SelectionAriaMixin(
  SingleSelectionMixin(
  SwipeDirectionMixin(
  TouchSwipeMixin(
  TrackpadSwipeMixin(
    React.Component
  )))))))))));


class SlidingCarouselWithDots extends Base {

  get defaults() {
    return Object.assign({}, super.defaults, {
      selectionRequired: true
    });
  }

  render() {

    const rootProps = this.rootProps();
    Object.assign(rootProps.style, this.props.style, {
      'position': 'relative'
    });

    const fillStyle = {
      'height': '100%',
      'position': 'absolute',
      'width': '100%'      
    };

    return (
      <div ref={el => this.root = el} {...rootProps}>
        <this.ArrowSelection style={fillStyle}>
          <this.PageDots style={fillStyle}>
            <SlidingViewport
              onSelectedIndexChanged={this.selectedIndexChanged}
              selectedIndex={this.state.selectedIndex}
              style={fillStyle}
              swiping={this.state.swiping}
              swipeFraction={this.state.swipeFraction}
              >
              {this.renderItems()}
            </SlidingViewport>
          </this.PageDots>
        </this.ArrowSelection>
      </div>
    );
  }

}




export default () => {

  const style = {
    'background': 'black',
    'height': '100%'
  };

  return (
    <SlidingCarouselWithDots style={style} aria-label="Nature scenes">
      <img src="images/image1.jpg" alt="Lake"/>
      <img src="images/image2.jpg" alt="Horses"/>
      <img src="images/image3.jpg" alt="Ladybug on wheat"/>
      <img src="images/image4.jpg" alt="Mountain"/>
      <img src="images/image5.jpg" alt="Palm tree"/>
    </SlidingCarouselWithDots>
  );
}
