import React from 'react';
import ReactDOM from 'react-dom';

import Modes from './Modes.jsx';
import SingleSelectionMixin from '../mixins/SingleSelectionMixin';
import TabStrip from './TabStrip.jsx';


const Base = 
  SingleSelectionMixin(
    React.Component
  );

export default class Tabs extends Base {

  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.state, {
      selectedIndex: parseInt(this.props.selectedIndex || 0)
    });
  }

  render() {
    const modesStyle = {
      'background': 'white',
      'border': '1px solid #ccc',
      'boxSizing': 'border-box',
      'flex': 1
    };
    const rootStyle = Object.assign({}, this.props.style, {
      'display': 'inline-flex',
      'flexDirection': 'column',
      'position': 'relative'
    });
    // TODO: Can we come up with a way of generating globally unique tab panel
    // IDs that are stable across renders?
    const panels = this.props.children.map((panel, index) => {
      const panelId = panel.props.id || `_panel${index}`;
      const panelRole = panel.props.role || 'tabpanel';
      return React.cloneElement(panel, {
        id: panelId,
        key: index,
        role: panelRole
      });
    });
    return (
      <div style={rootStyle} role="tablist">
        <TabStrip
          onSelectedIndexChanged={this.selectedIndexChanged}
          selectedIndex={this.state.selectedIndex}
          >
          {this.tabButtons()}
        </TabStrip>
        <Modes
          onSelectedIndexChanged={this.selectedIndexChanged}
          selectedIndex={this.state.selectedIndex}
          style={modesStyle}
          >
          {panels}
        </Modes>
      </div>
    );
  }

  tabButtons() {
    if (this.props.tabButtons) {
      return this.props.tabButtons;
    }
    return this.props.children.map((panel, index) => {
      const label = panel.props['aria-label'];
      const panelId = panel.props.id || `_panel${index}`;
      const role = 'tab';
      return (
        <button key={index} aria-controls={panelId} tabIndex="0">{label}</button>
      );
    });
  }

}
