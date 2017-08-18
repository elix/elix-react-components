import React from 'react';
import ReactDOM from 'react-dom';

import ListMixin from '../mixins/ListMixin';
import SingleSelectionMixin from '../mixins/SingleSelectionMixin';
import Spread from './Spread';


const Base =
  ListMixin(
  SingleSelectionMixin(
    React.Component
  ));


export default class SlidingViewport extends Base {

  get defaults() {
    return Object.assign({}, super.defaults, {
      orientation: 'horizontal',
      selectionRequired: true
    });
  }

  render() {

    const rootProps = this.rootProps();
    
    // Merge style set on this component on top of default style.
    Object.assign(
      rootProps.style,
      this.props.style
    );

    const items = this.renderItems();

    const swipeFraction = this.state.swipeFraction || 0;
    const fractionalSelection = this.state.selectedIndex + swipeFraction;
    const fraction = fractionalSelection / items.length;
    const selectionStyle = {
      'transform': `translateX(${-fraction * 100}%)`
    };

    const spreadStyle = Object.assign(
      {
        'position': 'absolute',
        'transition': !this.state.swiping && 'transform 0.25s',
        'willChange': 'transform'
      },
      selectionStyle
    );

    return (
      <div ref={el => this.root = el} {...rootProps}>
        <Spread style={spreadStyle} role="none">
          {items}
        </Spread>
      </div>
    );
  }

  rootProps() {
    const base = super.rootProps ? super.rootProps() : {};
    const style = Object.assign(
      {
        'overflow': 'hidden',
        'position': 'relative'
      },
      base.style
    );

    return Object.assign({}, base, { style });
  }

  swipeLeft() {
    this.selectNext();
  }

  swipeRight() {
    this.selectPrevious();
  }
}
