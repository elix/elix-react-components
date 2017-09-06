import React from 'react';
import ReactDOM from 'react-dom';

import SlidingCarouselAccessories from '../../../src/components/SlidingCarousel';
// import SlidingCarouselAccessories from '../SlidingCarouselAccessories';


export default function ThemedCarousel(props) {

  const style = Object.assign(
    {
      'lineHeight': '0'
    },
    props.style
  );

  return (
    <SlidingCarouselAccessories style={style}>
      {props.children}
    </SlidingCarouselAccessories>
  );
}
