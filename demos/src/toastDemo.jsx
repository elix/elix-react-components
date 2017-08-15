import React from 'react';
import ReactDOM from 'react-dom';
import Toast from '../../src/components/Toast.jsx';


class ToastDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      expanded: null,
      toastEdge: 'bottom'
    };
    this.openedChanged = this.openedChanged.bind(this);
    this.toggleToast = this.toggleToast.bind(this);
  }

  componentDidUpdate() {
    if (!this.state.opened && this.state.nextEdge) {
      this.setState({
        opened: true,
        fromEdge: nextEdge,
        nextEdge: null
      });
    }
  }

  openedChanged(opened) {
    this.setState({ opened });
  }

  render() {
    return (
      <div>
        <p>
          Click a button to toggle a toast from that location:
        </p>
        <div className="buttonContainer">
          <div className="buttonRow">
            <button alt="top left" onClick={this.toggleToast} data-edge="top-left"></button>
            <button alt="top" onClick={this.toggleToast} data-edge="top"></button>
            <button alt="top right" onClick={this.toggleToast} data-edge="top-right"></button>
          </div>
          <div className="buttonRow bottom">
            <button alt="bottom left" onClick={this.toggleToast} data-edge="bottom-left"></button>
            <button alt="bottom" onClick={this.toggleToast} data-edge="bottom"></button>
            <button alt="bottom right" onClick={this.toggleToast} data-edge="bottom-right"></button>
          </div>
        </div>
        {/*
        <p>
          <label>
            <input type="checkbox" onChange="toggleDocumentDirection()"/>
            Flip directions to test right-to-left language support
          </label>
        </p>
        */}
        <Toast
          expanded={this.state.expanded}
          fromEdge={this.state.toastEdge}
          onOpenedChanged={this.openedChanged}
          opened={this.state.opened}
          >
          <div style={{ 'padding': '1em' }}>
            Mmm... toast...
          </div>
        </Toast>
      </div>
    );
  }

  toggleToast(event) {
    const button = event.target;
    const edge = button.getAttribute('data-edge');
    if (this.state.opened) {
      this.setState({
        expanded: false,
        nextEdge: edge
      });
    } else {
      this.setState({
        opened: true,
        toastEdge: edge
      });
    }
  }

}


export default () => (
  <ToastDemo/>
);
