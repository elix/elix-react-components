import React from 'react';
import ReactDOM from 'react-dom';
import TouchSwipeMixin from '../../src/mixins/TouchSwipeMixin.js';


class SwipeDemo extends TouchSwipeMixin(React.Component) {

  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
  }

  render() {
    let rootProps = this.rootProps();

    const even = this.state.counter % 2 === 0;

    const style = Object.assign({}, rootProps.style, {
      'background': even ? 'gray' : 'white',
      'display': 'flex',
      'flex': 1,
      'flexDirection': 'column'
    });

    rootProps = Object.assign({}, rootProps, { style });

    const cardStyle = {
      'alignItems': 'center',
      'background': even ? 'white' : 'gray',
      'display': 'flex',
      'flex': 1,
      'justifyContent': 'center',
      'transform': `translateX(${-100 * this.state.swipeFraction}%)`,
      'willChange': 'transform'
    };

    const counterStyle = {
      'fontSize': '48px'
    };

    return (
      <div ref={el => this.root = el} {...rootProps}>
        <div style={cardStyle}>
          <div style={counterStyle}>
            {this.state.counter}
          </div>
        </div>
      </div>
    );
  }

  swipeLeft() {
    this.setState({
      counter: this.state.counter + 1
    });
  }

  swipeRight() {
    this.setState({
      counter: this.state.counter - 1
    });
  }

}


export default () => (
  <SwipeDemo />
);
