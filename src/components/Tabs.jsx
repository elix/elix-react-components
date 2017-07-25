import React from 'react';
import ReactDOM from 'react-dom';

import ListBox from './ListBox';
import SingleSelectionMixin from '../mixins/SingleSelectionMixin';


const Base = 
  SingleSelectionMixin(
    React.Component
  );

export default class Tabs extends Base {

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

}
