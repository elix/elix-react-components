import React from 'react';
import ReactDOM from 'react-dom';

import SingleSelectionMixin from '../../../src/mixins/SingleSelectionMixin';
import SlidingCarouselAccessories from '../SlidingCarouselAccessories';


const Base =
  SingleSelectionMixin(
    React.Component
  );

export default class SereneCarousel extends Base {

  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.state, {
      swipeFraction: null
    });
    this.swipeFractionChanged = this.swipeFractionChanged.bind(this);
  }

  componentWillReceiveProps(props) {
    if (super.componentWillReceiveProps) { super.componentWillReceiveProps(props); }
    if (typeof props.swipeFraction !== 'undefined' && this.state.swipeFraction !== props.swipeFraction) {
      this.setState({
        swipeFraction: props.swipeFraction
      });
    }
  }

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
        onSwipeFractionChanged={this.swipeFractionChanged}
        selectedIndex={this.state.selectedIndex}
        style={style}
        swipeFraction={this.state.swipeFraction}
      >
        {this.props.children}
      </SlidingCarouselAccessories>
    );
  }

  swipeFractionChanged(swipeFraction) {
    if (this.props.onSwipeFractionChanged) {
      this.props.onSwipeFractionChanged(swipeFraction);
    } else {
      this.setState({ swipeFraction });
    }
  }

}
