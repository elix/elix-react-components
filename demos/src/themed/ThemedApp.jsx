import React from 'react';
import ReactDOM from 'react-dom';

import PanelWithDrawer from '../PanelWithDrawer';


export default class ThemedApp extends PanelWithDrawer {
  render() {
    return (
      <div>
        <header>
          <this.DrawerToggleButton/>
        </header>
        <this.Drawer>
          Drawer contents go here...
        </this.Drawer>
        {this.props.children}
      </div>
    );
  }
}
