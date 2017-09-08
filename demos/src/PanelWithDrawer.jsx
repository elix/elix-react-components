import React from 'react';
import ReactDOM from 'react-dom';

import Drawer from '../../src/components/Drawer.jsx';
import QuietButton from './QuietButton';


export default class PanelWithDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.state, {
      visualState: 'closed'
    });
    this.changeVisualState = this.changeVisualState.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.Drawer = AttachedDrawer.bind(this);
    this.DrawerToggleButton = DrawerToggleButton.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
  }

  changeVisualState(visualState) {
    this.setState({ visualState });
  }

  closeDrawer() {
    this.changeVisualState('collapsed');
  }

  get drawerComponent() {
    return Drawer;
  }

  openDrawer() {
    this.changeVisualState('opened');
  }

}


function AttachedDrawer(props) {
  const DrawerClass = props.drawerComponent || this.drawerComponent;
  return (
    <DrawerClass
      onChangeVisualState={this.changeVisualState}
      style={props.style}
      visualState={this.state.visualState}
      >
      {props.children}
    </DrawerClass>
  )
}


function DrawerToggleButton(props) {
  const buttonStyle = Object.assign(
    {
      'cursor': 'pointer',
      'margin': '16px'
    },
    props.style
  );
  return (
    <QuietButton style={buttonStyle} onClick={this.openDrawer} aria-label="Open navigation">
      {/* From Google's Material Icons collection */}
      <svg fill="#000000" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
      </svg>
      {props.children}
    </QuietButton>
  );
}
