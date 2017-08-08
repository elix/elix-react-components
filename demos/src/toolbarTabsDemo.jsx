import React from 'react';
import ReactDOM from 'react-dom';
import Tabs from '../../src/components/Tabs.jsx';


// Define a custom tab button for use with Tabs / TabStrip.
function ToolbarTabButton(props) {
  const selected = props['aria-selected'];
  const selectedStyle = {
    'color': 'dodgerblue'
  }
  const style = Object.assign(
    {},
    props.style,
    {
      'alignItems': 'center',
      'background': 'transparent',
      'border': 'none',
      'color': 'inherit',
      'display': 'flex',
      'flex': '1',
      'flexDirection': 'column',
      'outline': 'none',
      'padding': '6px',
      'WebkitTapHighlightColor': 'transparent'
    },
    selected && selectedStyle
  );
  const buttonProps = Object.assign(
    {},
    props,
    { style }
  )
  return (
    <button {...buttonProps}>
      {props.children}
    </button>
  );
}


export default () => {

  const tabButtons = [
    (
      <ToolbarTabButton aria-label="Home" key="home">
        <div className="material-icons">home</div>
        Home
      </ToolbarTabButton>
    ),
    (
      <ToolbarTabButton aria-label="Search" key="search">
        <div className="material-icons">search</div>
        Search
      </ToolbarTabButton>
    ),
    (
      <ToolbarTabButton aria-label="Settings" key="settings">
        <div className="material-icons">settings</div>
        Settings
      </ToolbarTabButton>
    )
  ];

  const tabsStyle = {
    'background': '#eee',
    'color': 'gray',
    'display': 'flex',
    'flex': 1
  };

  return (
    <Tabs
      tabButtons={tabButtons}
      tabAlign="stretch"
      tabPosition="bottom"
      style={tabsStyle}
      >
      <div className="page">Home page</div>
      <div className="page">Search page</div>
      <div className="page">Settings page</div>
    </Tabs>
  );
}
