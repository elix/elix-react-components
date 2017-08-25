import React from 'react';
import ReactDOM from 'react-dom';

import SlidingCarouselAccessories from '../SlidingCarouselAccessories';


export default function ThemedCarousel(props) {

  const style = {
    'height': '415px',
    'width': '100%'
  };

  return (
    <SlidingCarouselAccessories style={style}>
      {props.children}
    </SlidingCarouselAccessories>
  );
}
