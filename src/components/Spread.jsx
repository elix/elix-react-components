import React from 'react';
import ReactDOM from 'react-dom';


export default (props) => {

  const style = {
    'display': 'flex',
    'height': '100%',
    'position': 'relative',
    'width': `${props.children.length * 100}%`
  };

  const items = props.children.map((item, index) => {
    const key = index;
    const style = Object.assign({}, item.props.style, {
      'objectFit': 'contain',
      'width': '100%'
    });
    return React.cloneElement(item, {
      key,
      style
    });
  });

  return (
    <div style={style}>
      {items}
    </div>
  );
};
