import React from 'react';
import ReactDOM from 'react-dom';

export default function PageDotsMixin(Base) {
  return class HasPageDots extends Base {

    constructor(props) {
      super(props);
      this.dotClick = this.dotClick.bind(this);
      this.PageDots = PageDots.bind(this);
    }

    dotClick(event) {
      const dot = event.target;
      const dots = dot.parentNode;
      const index = [...dots.children].indexOf(dot);
      if (index >= 0) {
        this.selectedIndexChanged(index);
      }
      event.preventDefault();
      event.stopPropagation();
    }
  }
}


function PageDots(props) {

  const style = Object.assign({}, {
    'display': 'flex'
  }, props.style);

  const dots = React.Children.map(this.items, (item, index) => (
    <Dot
      onClick={this.dotClick}
      selected={index === this.state.selectedIndex}
    />
  ));

  const dotsStyle = {
    'bottom': '0',
    'display': 'flex',
    'justifyContent': 'center',
    'position': 'absolute',
    'width': '100%',
    'zIndex': '1'
  };

  const contentStyle = {
    'display': 'flex',
    'flex': 1,
    'position': 'relative',
    'zIndex': 0
  };

  return (
    <div style={style}>
      <div style={dotsStyle} role="none">
        {dots}
      </div>
      <div style={contentStyle} role="none">
        {props.children}
      </div>
    </div>
  );
}


function Dot(props) {
  const style = Object.assign(
    {
      'background': 'rgb(255, 255, 255)',
      'borderRadius': '7px',
      'boxShadow': '0 0 1px 1px rgba(0, 0, 0, 0.5)',
      'boxSizing': 'border-box',
      'cursor': 'pointer',
      'height': '8px',
      'margin': '7px 5px',
      'opacity': '0.4',
      'padding': '0',
      'transition': 'background 0.2s box-shadow 0.2s',
      'width': '8px'
    },
    props.selected && {
      'opacity': '0.95'
    }
  );
  return (
    <div onClick={props.onClick} style={style} role="none"/>
  );
}
