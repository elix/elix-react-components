import React from 'react';
import ReactDOM from 'react-dom';
import ListBox from './ListBox';


export default class Tabs extends React.Component {

  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.state, {
      selectedIndex: parseInt(this.props.selectedIndex || -1)
    });
    this.selectedIndexChanged = this.selectedIndexChanged.bind(this);
  }

  render() {
    return (
      <div>
        <ListBox
          selectedIndex={this.state.selectedIndex}
          onSelectedIndexChanged={this.selectedIndexChanged}
          >
          {this.props.children}
        </ListBox>
        <ListBox
          selectedIndex={this.state.selectedIndex}
          onSelectedIndexChanged={this.selectedIndexChanged}
          >
          {this.props.children}
        </ListBox>
      </div>
    );
  }

  selectedIndexChanged(selectedIndex) {
    this.setState({
      selectedIndex: selectedIndex
    });
  }

}
