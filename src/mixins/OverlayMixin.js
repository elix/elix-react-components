import React from 'react';
import ReactDOM from 'react-dom';


export default function OverlayMixin(Base) {
  return class Overlay extends Base {

    constructor(props) {
      super(props);
      const opened = props.opened || this.defaults.opened;
      this.state = Object.assign({}, this.state, { opened });
    }

    componentDidUpdate() {
      if (super.componentDidUpdate) { super.componentDidUpdate(); }
      if (this.state.opened) {
        this.root.focus();
      }
    }

    componentWillReceiveProps(props) {
      if (this.state.opened !== props.opened) {
        this.setState({
          opened: props.opened
        });
      }
    }

    get defaults() {
      return Object.assign({}, super.defaults, {
        opened: false
      });
    }

    openedChanged(opened) {
      if (this.state.opened !== opened) {
        if (this.props.onOpenedChanged) {
          this.props.onOpenedChanged(opened);
        } else {
          this.setState({
            opened
          });
        }
      }
    }

    render() {
      const rootProps = this.rootProps();
      // Merge style set on this component on top of default style.
      Object.assign(
        rootProps.style,
        this.props.style
      );

      return (
        <div ref={el => this.root = el} {...rootProps}>
          {this.props.children}
        </div>
      );
    }

    rootProps() {
      const base = super.rootProps ? super.rootProps() : {};
      const style = Object.assign({}, base.style, {
        'display': this.state.opened ? 'block' : 'none'
      });
      return Object.assign({}, base, { style });
    }

  }
}
