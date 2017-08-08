import React from 'react';
import ReactDOM from 'react-dom';

import Modes from './Modes.jsx';
import ChildrenItemsMixin from '../mixins/ChildrenItemsMixin';
import SingleSelectionMixin from '../mixins/SingleSelectionMixin';
import TabStrip from './TabStrip.jsx';


const Base =
  ChildrenItemsMixin(
  SingleSelectionMixin(
    React.Component
  ));

export default class Tabs extends Base {

  get defaults() {
    return Object.assign({}, super.defaults, {
      selectionRequired: true,
      tabAlign: 'start',
      tabPosition: 'top'
    });
  }

  render() {
    const modesStyle = {
      'background': 'white',
      'border': '1px solid #ccc',
      'boxSizing': 'border-box',
      'display': 'flex',
      'flex': 1
    };
    const tabPosition = this.props.tabPosition || this.defaults.tabPosition;
    const lateralPosition = tabPosition === 'left' || tabPosition === 'right';
    const lateralStyle = {
      'flexDirection': 'row'
    };
    const rootStyle = Object.assign(
      {},
      {
        'display': 'inline-flex',
        'flexDirection': 'column',
        'position': 'relative'
      },
      lateralPosition && lateralStyle,
      this.props.style
    );
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
  
    // Create the tab strip and tab panels.
    const tabStrip = (
      <TabStrip
        onSelectedIndexChanged={this.selectedIndexChanged}
        selectedIndex={this.state.selectedIndex}
        style={this.props.tabStripStyle}
        tabAlign={this.props.tabAlign}
        tabPosition={this.props.tabPosition}
      >
        {this.tabButtons()}
      </TabStrip>
    );
    const tabPanels = (
      <Modes
        onSelectedIndexChanged={this.selectedIndexChanged}
        selectedIndex={this.state.selectedIndex}
        style={modesStyle}
      >
        {panels}
      </Modes>
    );

    // Physically reorder the tabs and panels to reflect the desired arrangement.
    // We could change the visual appearance by reversing the order of the flex
    // box, but then the visual order wouldn't reflect the document order, which
    // determines focus order. That would surprise a user trying to tab through
    // the controls.
    const topOrLeftPosition = (tabPosition === 'top' || tabPosition === 'left');
    const firstElement = topOrLeftPosition ?
      tabStrip :
      tabPanels;
    const lastElement = topOrLeftPosition ?
      tabPanels :
      tabStrip;

    return (
      <div style={rootStyle}>
        {firstElement}
        {lastElement}
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
