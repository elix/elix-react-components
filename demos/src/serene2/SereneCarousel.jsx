import React from 'react';
import ReactDOM from 'react-dom';

import SingleSelectionMixin from '../../../src/mixins/SingleSelectionMixin';
import SlidingCarouselAccessories from '../SlidingCarouselAccessories';


const Base =
  SingleSelectionMixin(
    React.Component
  );

export default class SereneCarousel extends Base {

  render() {
    const style = Object.assign(
      {
        'background': '#222',
        'lineHeight': '0'
      },
      this.props.style
    );

    return (
      <SlidingCarouselAccessories
        aria-label={this.props['aria-label']}
        onSelectedIndexChanged={this.updateSelectedIndex}
        selectedIndex={this.state.selectedIndex}
        style={style}
      >
        {this.props.children}
      </SlidingCarouselAccessories>
    );
  }
}
