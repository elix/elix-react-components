import React from 'react';
import ReactDOM from 'react-dom';

import SlidingCarouselAccessories from '../SlidingCarouselAccessories';


export default function ThemedCarousel(props) {

  const style = Object.assign(
    {
      'background': '#222',
      'lineHeight': '0'
    },
    props.style
  );

  return (
    <SlidingCarouselAccessories style={style} aria-label={props['aria-label']}>
      {props.children}
    </SlidingCarouselAccessories>
  );
}
