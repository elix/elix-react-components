import React from 'react';
import ReactDOM from 'react-dom';


// TODO: Refactor
export default function ModalBackdrop(props) {

  const style = Object.assign({
    'background': 'black',
    'height': '100%',
    'left': 0,
    'opacity': 0.2,
    'position': 'absolute',
    'top': 0,
    'width': '100%'
  }, props.style);

  return (
    <div role="none" style={style} />
  );
}
