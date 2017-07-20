import React from 'react';
import ReactDOM from 'react-dom';


export default class ListBox extends React.Component {

  render() {

    const style = `
      .selected {
            background: var(--elix-selected-background, highlight);
            color: var(--elix-selected-color, highlighttext);
      }
    `;

    const selectedIndex = parseInt(this.props.selectedIndex);
    let index = 0;
    const children = React.Children.map(this.props.children, child => {
      return (index++ !== selectedIndex) ?
        child :
        React.cloneElement(child, {
          className: 'selected'
        });
    });

    return (
      <div>
        <style>{style}</style>
        {children}
      </div>
    );
  }

}
