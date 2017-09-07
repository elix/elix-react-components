import React from 'react';
import ReactDOM from 'react-dom';


export default function ThemedApp(props) {
  return (
    <div>
      <button>Hello</button>
      {props.children}
    </div>
  );
}
