import React from 'react';
import ReactDOM from 'react-dom';

import SlidingCarousel from '../../../src/components/SlidingCarousel';


export default function ThemedCarousel(props) {

  const style = {
    'height': '415px',
    'width': '100%'
  };

  return (
    <SlidingCarousel style={style}>
      {props.children}
    </SlidingCarousel>
  );
}
