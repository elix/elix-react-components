import React from 'react';
import ReactDOM from 'react-dom';

import SlidingCarouselAccessories from '../SlidingCarouselAccessories';


export default function ThemedCarousel(props) {

  const style = Object.assign(
    {
      'height': '415px'
    },
    props.style
  );

  return (
    <SlidingCarouselAccessories style={style}>
      {props.children}
    </SlidingCarouselAccessories>
  );
}
