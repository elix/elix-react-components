import React from 'react';
import ReactDOM from 'react-dom';


export default function Spread(props) {

  const count = props.children.length;

  const style = Object.assign(
    {
      'display': 'flex',
      'height': '100%',
      'position': 'relative',
      'width': `${count * 100}%`
    },
    props.style
  );

  const items = props.children.map((item, index) => {
    const key = index;
    const style = Object.assign({}, item.props.style, {
      'objectFit': 'contain',
      'width': `${100 / count}%`
    });
    return React.cloneElement(item, {
      key,
      style
    });
  });

  return (
    <div style={style} role={props.role}>
      {items}
    </div>
  );
}
