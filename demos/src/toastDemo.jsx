import React from 'react';
import ReactDOM from 'react-dom';
import Toast from '../../src/components/Toast.jsx';


class ToastDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nextEdge: null,
      fromEdge: 'bottom',
      visualState: 'closed'
    };
    this.changeVisualState = this.changeVisualState.bind(this);
    this.toggleToast = this.toggleToast.bind(this);
  }

  changeVisualState(visualState) {
    this.setState({ visualState });
  }

  componentDidUpdate() {
    // If we've been waiting for a toast on one edge to close so that we can
    // open it on another, open it on the next edge now.
    if (this.state.visualState === 'closed' && this.state.nextEdge) {
      // Wait so that component can completely render its closed state before we
      // open it again.
      setTimeout(() => {
        this.setState({
          fromEdge: this.state.nextEdge,
          nextEdge: null,
          visualState: 'opened'
        });
      });
    }
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
          fromEdge={this.state.fromEdge}
          onChangeVisualState={this.changeVisualState}
          visualState={this.state.visualState}
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
    if (this.state.visualState === 'expanded') {
      const nextEdge = this.state.fromEdge !== edge ? edge : null;
      this.setState({
        visualState: 'collapsed',
        nextEdge: nextEdge
      });
    } else {
      this.setState({
        visualState: 'opened',
        fromEdge: edge
      });
    }
  }

}


export default () => (
  <ToastDemo/>
);
