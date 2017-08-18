import React from 'react';
import ReactDOM from 'react-dom';

import SlidingCarousel from '../../src/components/SlidingCarousel';


export default () => {

  const style = {
    'background': 'black',
    'height': '100%'
  };

  return (
    <SlidingCarousel style={style} aria-label="Nature scenes">
      <img src="images/image1.jpg" alt="Lake"/>
      <img src="images/image2.jpg" alt="Horses"/>
      <img src="images/image3.jpg" alt="Ladybug on wheat"/>
      <img src="images/image4.jpg" alt="Mountain"/>
      <img src="images/image5.jpg" alt="Palm tree"/>
    </SlidingCarousel>
  );
}