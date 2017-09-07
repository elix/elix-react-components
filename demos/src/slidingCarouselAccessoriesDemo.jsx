import React from 'react';
import ReactDOM from 'react-dom';

import SlidingCarouselAccessories from './SlidingCarouselAccessories';


export default () => {

  const carouselStyle = {
    'background': 'black',
    'height': '100%'
  };
  const imageStyle = {
    'display': 'inline-block',
    'height': '100%',
    'verticalAlign': 'middle'
  };

  return (
    <SlidingCarouselAccessories style={carouselStyle} aria-label="Nature scenes">
      <img style={imageStyle} src="images/image1.jpg" alt="Lake"/>
      <img style={imageStyle} src="images/image2.jpg" alt="Horses"/>
      <img style={imageStyle} src="images/image3.jpg" alt="Ladybug on wheat"/>
      <img style={imageStyle} src="images/image4.jpg" alt="Mountain"/>
      <img style={imageStyle} src="images/image5.jpg" alt="Palm tree"/>
    </SlidingCarouselAccessories>
  );
}
