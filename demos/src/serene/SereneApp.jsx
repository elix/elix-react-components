import React from 'react';
import ReactDOM from 'react-dom';

import DesktopMixin from '../DesktopMixin';
import PanelWithDrawer from '../PanelWithDrawer';
import SereneDrawer from './SereneDrawer';


let documentKeydownListener;


const Base =
  DesktopMixin(
    PanelWithDrawer
  );


export default class SereneApp extends Base {

  componentDidMount() {
    if (super.componentDidMount) { super.componentDidMount(); }
    documentKeydownListener = document.addEventListener('keydown', event => {
      if (event.which === 121 /* F10 */) {
        this.toggleDrawer();
      }
    });
  }
  
  componentWillUnmount() {
    if (super.componentWillUnmount) { super.componentWillUnmount(); }
    document.removeEventListener(documentKeydownListener);
  }

  get drawerComponent() {
    return SereneDrawer;
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
          <SereneNavigationLinks style={headerNavigationStyle} linkStyle={headerLinkStyle} />
        </header>
        <this.Drawer>
          <div style={{ 'margin': '2em' }}>
            <SereneNavigationLinks linkStyle={drawerLinkStyle} />
          </div>
        </this.Drawer>
        {this.props.children}
      </div>
    );
  }
}


function SereneNavigationLinks(props) {
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
