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

  const selectedIndex = this.state.selectedIndex;
  const swipeFraction = this.state.swipeFraction;
  const dots = React.Children.map(this.items, (item, index) => {
    const opacity = opacityForDotWithIndex(index, selectedIndex, swipeFraction);
    const dotStyle = { opacity };
    return (
      <PageDot onClick={this.dotClick} style={dotStyle}/>
    )
  });

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


function PageDot(props) {
  const desktop = matchMedia('(min-width: 768px)').matches;
  const size = desktop ? 12 : 8;
  const style = Object.assign(
    {
      'background': 'rgb(255, 255, 255)',
      'borderRadius': '7px',
      'boxShadow': '0 0 1px 1px rgba(0, 0, 0, 0.5)',
      'boxSizing': 'border-box',
      'cursor': 'pointer',
      'height': `${size}px`,
      'margin': '7px 5px',
      'padding': '0',
      'transition': 'background 0.2s box-shadow 0.2s',
      'width': `${size}px`
    },
    props.style
  );
  return (
    <div onClick={props.onClick} style={style} role="none"/>
  );
}


function opacityForDotWithIndex(index, selectedIndex, swipeFraction) {
  // const dotCount = dots.length;
  const opacityMinimum = 0.4;
  const opacityMaximum = 0.95;
  const opacityRange = opacityMaximum - opacityMinimum;
  const fractionalIndex = selectedIndex + swipeFraction;
  const leftIndex = Math.floor(fractionalIndex);
  const rightIndex = Math.ceil(fractionalIndex);
  // const selectionWraps = element.selectionWraps;
  let awayIndex = swipeFraction >= 0 ? leftIndex : rightIndex;
  let towardIndex = swipeFraction >= 0 ? rightIndex : leftIndex;
  // if (selectionWraps) {
  //   awayIndex = keepIndexWithinBounds(dotCount, awayIndex);
  //   towardIndex = keepIndexWithinBounds(dotCount, towardIndex);
  // }
  // Stupid IE doesn't have Math.trunc.
  // const truncatedSwipeFraction = Math.trunc(swipeFraction);
  const truncatedSwipeFraction = swipeFraction < 0 ? Math.ceil(swipeFraction) : Math.floor(swipeFraction);
  const progress = swipeFraction - truncatedSwipeFraction;
  const opacityProgressThroughRange = Math.abs(progress) * opacityRange;

  let opacity;
  if (index === awayIndex) {
    opacity = opacityMaximum - opacityProgressThroughRange;
  } else if (index === towardIndex) {
    opacity = opacityMinimum + opacityProgressThroughRange;
  } else {
    opacity = opacityMinimum;
  }

  return opacity;
}
