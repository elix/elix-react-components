import React from 'react';
import ReactDOM from 'react-dom';
import Drawer from '../../src/components/Drawer.jsx';


class DrawerDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      opened: false
    };
    this.openDrawer = this.openDrawer.bind(this);
    this.openedChanged = this.openedChanged.bind(this);
  }

  openDrawer() {
    this.setState({
      opened: true
    });
  }

  openedChanged(opened) {
    this.setState({ opened });
  }

  render() {
    return (
      <div>
        <p>
          <button onClick={this.openDrawer}>Open drawer</button>
        </p>
        <Drawer
          onOpenedChanged={this.openedChanged}
          opened={this.state.opened}
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
