import React from 'react';
import ReactDOM from 'react-dom';
import Tabs from '../../src/components/Tabs.jsx';
import ToolbarTabButton from './ToolbarTabButton.jsx';


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
