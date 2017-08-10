import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from '../../src/components/Dialog.jsx';


class DialogDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      opened: false
    };
    this.closeDialog = this.closeDialog.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.openedChanged = this.openedChanged.bind(this);
  }

  closeDialog() {
    this.setState({
      opened: false
    });
  }

  openDialog() {
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
        <button onClick={this.openDialog}>Open dialog</button>

        <Dialog
          aria-label="Sample dialog"
          opened={this.state.opened}
          onOpenedChanged={this.openedChanged}
          >
          <div style={{ padding: '1em' }} onClick={this.closeDialog}>
            Tap/click here or press Esc to cancel.
          </div>
        </Dialog>

        <p className="floating">
          This paragraph has a z-index, but should appear behind the dialog.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed
          lorem scelerisque, blandit libero vitae, dapibus nisl. Sed turpis diam,
          placerat a feugiat sed, maximus at velit. Ut sit amet semper sapien. Donec
          vitae leo ex. Duis eget quam sed metus tempor lobortis eget feugiat elit.
          Cras varius, arcu ac commodo tincidunt, lectus dui convallis nunc, quis
          maximus nisl erat ac mi. Phasellus et velit diam. Sed rutrum eu enim at
          dictum. Proin orci turpis, consectetur id dolor sit amet, hendrerit
          condimentum dolor. Donec et mauris at lorem scelerisque sollicitudin
          tristique convallis leo. Phasellus commodo augue mi, a sagittis justo
          vehicula sed. Aenean congue, sapien ut malesuada fermentum, urna eros
          consectetur ante, ut tincidunt urna massa et dui.
        </p>
      </div>
    );
  }

}


export default () => (
  <DialogDemo/>
);
