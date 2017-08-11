import React from 'react';
import ReactDOM from 'react-dom';
import Popup from '../../src/components/Popup.jsx';


class PopupDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      opened: false
    };
    this.openPopup = this.openPopup.bind(this);
    this.openedChanged = this.openedChanged.bind(this);
  }

  openPopup() {
    this.setState({
      opened: true
    });
  }

  openedChanged(opened) {
    this.setState({ opened });
  }

  render() {
    return (
      <div>
        <p>
          <button onClick={this.openPopup}>Open popup</button>
        </p>
        <Popup
          opened={this.state.opened}
          onOpenedChanged={this.openedChanged}
          >
          <div style={{ padding: '1em' }}>
            Here's a popup.
          </div>
        </Popup>
      </div>
    );
  }

}


export default () => (
  <PopupDemo/>
);
