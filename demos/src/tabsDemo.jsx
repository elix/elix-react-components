import React from 'react';
import ReactDOM from 'react-dom';
import Tabs from '../../src/components/Tabs.jsx';


class TabsDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tabAlign: 'start',
      tabPosition: 'top',
      selectedIndex: 0
    };
    this.tabAlignChanged = this.tabAlignChanged.bind(this);
    this.tabPositionChanged = this.tabPositionChanged.bind(this);
    this.updateSelectedIndex = this.updateSelectedIndex.bind(this);
  }

  selectedIndexChanged(selectedIndex) {
    this.setState({ selectedIndex });
  }

  tabAlignChanged(event) {
    this.setState({
      tabAlign: event.target.value
    });
  }

  tabPositionChanged(event) {
    this.setState({
      tabPosition: event.target.value
    });
  }

  render() {
    return (
      <div>
        <Tabs
          onSelectedIndexChanged={this.updateSelectedIndex}
          style={{ height: '250px', width: '300px' }}
          tabAlign={this.state.tabAlign}
          tabPosition={this.state.tabPosition}
          selectedIndex={this.state.selectedIndex}
          >
          <div className="panel" aria-label="One">Page one</div>
          <div className="panel" aria-label="Two">Page two</div>
          <div className="panel" aria-label="Three">Page three</div>
        </Tabs>
        <p>
          Show tabs on:&nbsp;
          <select id="tabPosition" onChange={this.tabPositionChanged} value={this.state.tabPosition}>
            <option value="bottom">Bottom</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
            <option value="top">Top</option>
          </select>
          &nbsp;&nbsp;&nbsp;
          Align tabs:&nbsp;
          <select id="tabAlign" onChange={this.tabAlignChanged} value={this.state.tabAlign}>
            <option value="center">Center</option>
            <option value="end">End</option>
            <option value="start">Start</option>
            <option value="stretch">Stretch</option>
          </select>
        </p>
      </div>
    );
  }

}


export default () => (
  <TabsDemo/>
);
