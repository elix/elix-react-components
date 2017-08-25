import React from 'react';
import ReactDOM from 'react-dom';


export default function ThemedTabPanel(props) {
  const selectedStyle = {
    'opacity': 1
    // 'transitionDelay': '0.5s'
  };
  const style = Object.assign(
    props.style,
    {
      'background': 'white',
      'display': 'block',
      'left': 0,
      'opacity': 0,
      'position': 'absolute',
      'right': 0,
      'transition': 'opacity 0.6s ease-out'
    },
    props.selected && selectedStyle
  );
  return (
    <div style={style} aria-label={props['aria-label']}>
      {props.children}
    </div>
  );
}