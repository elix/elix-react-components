import React from 'react';
import ReactDOM from 'react-dom';
import Drawer from '../../src/components/Drawer.jsx';


class DrawerDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visualState: 'closed'
    };
    this.openDrawer = this.openDrawer.bind(this);
    this.changeVisualState = this.changeVisualState.bind(this);
  }

  changeVisualState(visualState) {
    this.setState({ visualState });
  }

  openDrawer() {
    this.changeVisualState('opened');
  }

  render() {
    return (
      <div>
        <p>
          <button onClick={this.openDrawer}>Open drawer</button>
        </p>
        <Drawer
          onChangeVisualState={this.changeVisualState}
          visualState={this.state.visualState}
          >
          <div style={{ 'margin': '2em' }}>
            Drawer elements go here...
          </div>
        </Drawer>
      </div>
    );
  }

}


export default () => (
  <DrawerDemo/>
);
