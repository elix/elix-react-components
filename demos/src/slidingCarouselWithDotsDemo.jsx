import React from 'react';
import ReactDOM from 'react-dom';


import DirectionSelectionMixin from '../../src/mixins/DirectionSelectionMixin';
import KeyboardDirectionMixin from '../../src/mixins/KeyboardDirectionMixin';
import KeyboardMixin from '../../src/mixins/KeyboardMixin';
import ListMixin from '../../src/mixins/ListMixin';
import PageDotsMixin from '../../src/mixins/PageDotsMixin';
import SelectionAriaMixin from '../../src/mixins/SelectionAriaMixin';
import SingleSelectionMixin from '../../src/mixins/SingleSelectionMixin';
import SlidingViewport from '../../src/components/SlidingViewport';
import TouchSwipeMixin from '../../src/mixins/TouchSwipeMixin';
import TrackpadSwipeMixin from '../../src/mixins/TrackpadSwipeMixin';


const Base =
  DirectionSelectionMixin(
  KeyboardDirectionMixin(
  KeyboardMixin(
  ListMixin(
  PageDotsMixin(
  SelectionAriaMixin(
  SingleSelectionMixin(
  TouchSwipeMixin(
  TrackpadSwipeMixin(
    React.Component
  )))))))));


class SlidingCarouselWithDots extends Base {

  constructor(props) {
    super(props);
    this.selectedIndexChanged = this.selectedIndexChanged.bind(this);
  }

  get defaults() {
    return Object.assign({}, super.defaults, {
      selectionRequired: true
    });
  }

  render() {

    const rootProps = this.rootProps();
    Object.assign(rootProps.style, this.props.style, {
      'display': 'flex'
    });

    const pageDotsStyle = {
      'flex': 1
    };

    const slidingViewportStyle = {
      'height': '100%',
      'position': 'absolute',
      'width': '100%'
    };

    return (
      <div ref={el => this.root = el} {...rootProps}>
        <this.PageDots style={pageDotsStyle}>
          <SlidingViewport
            onSelectedIndexChanged={this.selectedIndexChanged}
            selectedIndex={this.state.selectedIndex}
            style={slidingViewportStyle}
            swiping={this.state.swiping}
            swipeFraction={this.state.swipeFraction}
            >
            {this.renderItems()}
          </SlidingViewport>
        </this.PageDots>
      </div>
    );
  }

  rootProps() {
    return super.rootProps ? super.rootProps() : {};
  }

  selectedIndexChanged(selectedIndex) {
    this.setState({ selectedIndex });
  }

  swipeLeft() {
    this.selectNext();
  }

  swipeRight() {
    this.selectPrevious();
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
