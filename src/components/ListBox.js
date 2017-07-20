import React from 'react';
import ReactDOM from 'react-dom';


export default class ListBox extends React.Component {

  constructor(props) {
    super(props);
    this.keydown = this.keydown.bind(this);
    this.state = {
      selectedIndex: parseInt(this.props.selectedIndex || 0)
    };
  }

  keydown(event) {
    switch (event.keyCode) {

      case 38: // Up
        this.setState((prevState, props) => {
          const selectedIndex = prevState.selectedIndex;
          const newIndex = Math.max(selectedIndex - 1, 0);
          return {
            selectedIndex: newIndex
          };
        });
        break;

      case 40: // Down
        this.setState((prevState, props) => {
          const selectedIndex = prevState.selectedIndex;
          const newIndex = Math.min(selectedIndex + 1, props.children.length - 1);
          return {
            selectedIndex: newIndex
          };
        });
        break;
    }
  }

  render() {

    const style = `
      .selected {
            background: var(--elix-selected-background, highlight);
            color: var(--elix-selected-color, highlighttext);
      }
    `;

    const selectedIndex = this.state.selectedIndex;
    let index = 0;
    const children = React.Children.map(this.props.children, child => {
      return (index++ !== selectedIndex) ?
        child :
        React.cloneElement(child, {
          className: 'selected'
        });
    });

    return (
      <div onKeyDown={this.keydown} tabIndex="0">
        <style>{style}</style>
        {children}
      </div>
    );
  }

}
