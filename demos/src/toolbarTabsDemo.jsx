import React from 'react';
import ReactDOM from 'react-dom';
import Tabs from '../../src/components/Tabs.jsx';


function ToolbarTab(props) {
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
      // 'outline': 'none',
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


export default function (root) {

  const tabButtons = [
    (
      <ToolbarTab aria-label="Home">
        <div className="material-icons">home</div>
        Home
      </ToolbarTab>
    ),
    (
      <ToolbarTab aria-label="Search">
        <div className="material-icons">search</div>
        Search
      </ToolbarTab>
    ),
    (
      <ToolbarTab aria-label="Settings">
        <div className="material-icons">settings</div>
        Settings
      </ToolbarTab>
    )
  ];

  const tabsStyle = {
    'background': '#eee',
    'color': 'gray',
    'display': 'flex',
    'flex': 1
  };

  const demo = (
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

  ReactDOM.render(demo, root);
}
