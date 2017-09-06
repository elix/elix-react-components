import React from 'react';
import ReactDOM from 'react-dom';
import Spread from '../../src/components/Spread.jsx';


export default function() {

  const spreadStyle = {
    'height': '100%'
  };
  const imageStyle = {
    'display': 'inline-block',
    'height': '100%',
    'verticalAlign': 'middle'
  };

  return (
    <Spread style={spreadStyle}>
      <img style={imageStyle} src="images/image1.jpg" alt="Lake"/>
      <img style={imageStyle} src="images/image2.jpg" alt="Horses"/>
      <img style={imageStyle} src="images/image3.jpg" alt="Ladybug on wheat"/>
      <img style={imageStyle} src="images/image4.jpg" alt="Mountain"/>
      <img style={imageStyle} src="images/image5.jpg" alt="Palm tree"/>
    </Spread>
  );
}
