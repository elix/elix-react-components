import React from 'react';
import ReactDOM from 'react-dom';
import Drawer from '../../src/components/Drawer.jsx';


const desktopMediaQuery = matchMedia('(min-width: 600px)');


class PageWithDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      desktop: desktopMediaQuery.matches,
      visualState: 'closed'
    };
    this.closeDrawer = this.closeDrawer.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
    this.changeVisualState = this.changeVisualState.bind(this);
    desktopMediaQuery.addListener(event => {
      this.setState({ desktop: desktopMediaQuery.matches });
    });
  }

  changeVisualState(visualState) {
    this.setState({ visualState });
  }

  closeDrawer() {
    this.changeVisualState('collapsed');
  }

  openDrawer() {
    this.changeVisualState('opened');
  }

  render() {

    const desktopStyle = {
      'display': this.state.desktop ? 'inline-block' : 'none'
    };
    const mobileStyle = {
      'display': !this.state.desktop ? 'inherit' : 'none'
    };

    const menuButtonStyle = {
      'display': 'block',
      'margin': '1em'
    };

    return (
      <div>
        <header>
          <button style={mobileStyle} onClick={this.openDrawer} aria-label="Open navigation">
            {/* From Google's Material Icons collection */}
            <svg style={menuButtonStyle} fill="#000000" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </button>
          <a className="toolbarButton" style={desktopStyle} href="javascript:">Home</a>
          <a className="toolbarButton" style={desktopStyle} href="javascript:">Products</a>
          <a className="toolbarButton" style={desktopStyle} href="javascript:">Search</a>
          <a className="toolbarButton" style={desktopStyle} href="javascript:">Account</a>
          <a className="toolbarButton" style={desktopStyle} href="javascript:">About Us</a>
        </header>
        <Drawer
          onChangeVisualState={this.changeVisualState}
          visualState={this.state.visualState}
          >
          <div id="sideNavigation" role="navigation">
            <a className="toolbarButton" onClick={this.closeDrawer} href="javascript:">Home</a>
            <a className="toolbarButton" onClick={this.closeDrawer} href="javascript:">Products</a>
            <a className="toolbarButton" onClick={this.closeDrawer} href="javascript:">Search</a>
            <a className="toolbarButton" onClick={this.closeDrawer} href="javascript:">Account</a>
            <a className="toolbarButton" onClick={this.closeDrawer} href="javascript:">About Us</a>
          </div>
        </Drawer>
        {this.props.children}
      </div>
    );
  }

}


export default () => (
  <PageWithDrawer>
    <p>
      This page uses a responsive design for navigation buttons. At desktop window
      sizes, the buttons appear in a toolbar across the top of the page. At smaller
      mobile window sizes, the buttons appear in a slide-out navigation drawer.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet
      facilisis augue, sit amet dignissim felis. Curabitur in blandit justo.
      Duis ornare sem vitae enim feugiat, ultrices facilisis velit luctus.
      Aliquam porttitor sollicitudin nibh. Nulla lobortis quam venenatis,
      aliquam risus non, lacinia purus. Nulla a lectus non urna suscipit blandit
      id eget libero. Suspendisse ac bibendum arcu. Nunc consequat maximus
      aliquet. Nullam facilisis purus neque, sit amet egestas purus malesuada
      nec. In luctus tempus diam sit amet egestas.
    </p>
    <p>
      Pellentesque ipsum dolor, consequat ut nunc at, congue semper nisl. Duis
      id cursus orci, sit amet sollicitudin libero. Proin a vehicula neque, eget
      placerat arcu. Nullam ultricies ullamcorper rutrum. Donec nunc augue,
      porttitor in metus sit amet, molestie egestas magna. Donec eget neque
      elementum, feugiat erat eu, sagittis felis. Quisque vitae urna rhoncus
      sapien condimentum suscipit. Cras luctus sollicitudin urna sit amet
      tincidunt. Suspendisse potenti. Fusce pretium libero et augue lobortis,
      quis iaculis est vehicula.
    </p>
    <p>
      Nam varius et mauris dictum consectetur. Nulla venenatis, ante auctor
      scelerisque feugiat, nulla nisl elementum neque, nec facilisis quam erat
      eu orci. Integer rhoncus quam eu neque volutpat, et pulvinar nibh
      suscipit. In laoreet odio et sem bibendum rhoncus. Nunc dictum scelerisque
      gravida. Suspendisse volutpat nibh lectus, sit amet cursus ligula ultrices
      a. Mauris tempor eget risus sed laoreet. Proin fermentum lobortis sapien,
      et ultrices turpis vestibulum a. Morbi mollis nec orci at cursus. Nunc
      euismod neque dui, eu efficitur risus finibus sit amet. Duis felis augue,
      pretium vel felis a, scelerisque hendrerit nibh. Mauris efficitur
      consectetur molestie. Donec ac dolor nec odio mollis placerat. Etiam vel
      sem elementum, luctus nisi ac, volutpat ex. Curabitur auctor bibendum
      placerat. Aenean maximus ante nulla, eget vehicula tortor sagittis a.
    </p>
  </PageWithDrawer>
);
