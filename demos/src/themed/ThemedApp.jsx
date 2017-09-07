import React from 'react';
import ReactDOM from 'react-dom';

import PanelWithDrawer from '../PanelWithDrawer';
import ThemedDrawer from './ThemedDrawer';


export default class ThemedApp extends PanelWithDrawer {

  get drawerComponent() {
    return ThemedDrawer;
  }

  render() {
    return (
      <div>
        <header>
          <this.DrawerToggleButton/>
        </header>
        <this.Drawer>
          <div style={{ 'margin': '2em' }}>
            Drawer contents go here...
          </div>
        </this.Drawer>
        {this.props.children}
      </div>
    );
  }
}
