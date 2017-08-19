import React from 'react';
import ReactDOM from 'react-dom';


export default function SampleWrapperMixin(Base) {
  return class Sample extends Base {

    constructor(props) {
      super(props);
      this.click = this.click.bind(this);
      this.SampleWrapper = SampleWrapper.bind(this);
    }

    click(event) {
      console.log(`click!`);
    }

    rootProps() {
      const base = super.rootProps ? super.rootProps() : {};
      return Object.assign({}, base, {
        onClick: this.click
      });
    }
  }
}


function SampleWrapper(props) {
  const style = {
    'border': `${this.state.selectedIndex}px solid red`,
    'boxSizing': 'border-box',
    'display': 'flex',
    'height': '100%',
    'position': 'absolute',
    'width': '100%'
  };
  return (
    <div style={style}>
      {props.children}
    </div>
  );
};
