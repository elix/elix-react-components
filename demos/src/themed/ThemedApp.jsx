import React from 'react';
import ReactDOM from 'react-dom';

import DesktopMixin from '../DesktopMixin';
import PanelWithDrawer from '../PanelWithDrawer';
import ThemedDrawer from './ThemedDrawer';


const Base =
  DesktopMixin(
    PanelWithDrawer
  );


export default class ThemedApp extends Base {

  get drawerComponent() {
    return ThemedDrawer;
  }

  render() {

    const headerStyle = {
      'alignItems': 'center',
      'display': 'flex',
      'fontFamily': 'Gentium Basic',
      'fontSize': '18px'
    };
    const drawerButtonStyle = {
      'fontFamily': 'inherit',
      'fontSize': 'inherit'
    };
    const logoStyle = {
      'margin': '0 1em 0 0.5em'
    };
    const headerNavigationStyle = {
      'display': !this.state.desktop && 'none'
    };
    const headerLinkStyle = {
      'color': 'inherit',
      'margin': '0 1em'
    };
    const drawerLinkStyle = {
      'color': 'white',
      'display': 'block',
      'margin': '1em 0'
    };

    return (
      <div>
        <header style={headerStyle}>
          <this.DrawerToggleButton style={drawerButtonStyle}>
            <span style={logoStyle}>Serene Hotel</span>
          </this.DrawerToggleButton>
          <ThemedNavigationLinks style={headerNavigationStyle} linkStyle={headerLinkStyle} />
        </header>
        <this.Drawer>
          <div style={{ 'margin': '2em' }}>
            <ThemedNavigationLinks linkStyle={drawerLinkStyle} />
          </div>
        </this.Drawer>
        {this.props.children}
      </div>
    );
  }
}


function ThemedNavigationLinks(props) {
  const linkStyle = Object.assign(
    {
      'textDecoration': 'none'
    },
    props.linkStyle
  )
  const currentLinkStyle = Object.assign({}, linkStyle, {
    'fontWeight': 'bold'
  });
  return (
    <div style={props.style}>
      <a style={currentLinkStyle} href="javascript:">Rooms</a>
      <a style={linkStyle} href="javascript:">Experiences</a>
      <a style={linkStyle} href="javascript:">Dining</a>
      <a style={linkStyle} href="javascript:">Events</a>
      <a style={linkStyle} href="javascript:">Spa</a>
    </div>
  );
}
