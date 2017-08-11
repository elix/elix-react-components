import React from 'react';
import ReactDOM from 'react-dom';


export default function OverlayMixin(Base) {
  return class Overlay extends Base {

    constructor(props) {
      super(props);
      const opened = props.opened || this.defaults.opened;
      this.state = Object.assign({}, this.state, { opened });
    }

    close() {
      if (this.state.expanded) {
        this.setState({
          expanded: false
        });
      } else {
        this.openedChanged(false);
      }
    }

    componentDidMount() {
      if (super.componentDidMount) { super.componentDidMount(); }
      updateStyle(this);
    }
    
    componentDidUpdate() {
      if (super.componentDidUpdate) { super.componentDidUpdate(); }
      updateStyle(this);
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

    rootProps() {
      const base = super.rootProps ? super.rootProps() : {};
      const closedStyle = {
        'display': 'none'
      };
      const style = Object.assign({}, base.style, 
        !this.state.opened && closedStyle
      );
      return Object.assign({}, base, { style });
    }

  }
}


/*
 * Return the highest z-index currently in use in the document's light DOM.
 * 
 * This calculation looks at all light DOM elements, so is theoretically
 * expensive. That said, it only runs when an overlay is opening, and is only used
 * if an overlay doesn't have a z-index already. In cases where performance is
 * an issue, this calculation can be completely circumvented by manually
 * applying a z-index to an overlay.
 */
function maxZIndexInUse() {
  const elements = document.body.querySelectorAll('*');
  const zIndices = Array.prototype.map.call(elements, element => {
    const style = getComputedStyle(element);
    let zIndex = 0;
    if (style.position !== 'static' && style.zIndex !== 'auto') {
      const parsed = style.zIndex ? parseInt(style.zIndex) : 0;
      zIndex = !isNaN(parsed) ? parsed : 0;
    }
    return zIndex;
  });
  return Math.max(...zIndices);
}


function updateStyle(component) {
  const root = component.root;
  if (component.state.opened) {

    // See if the root element already has a z-index assigned via CSS. If no
    // z-index is found, we'll calculate and apply a default z-index.
    const style = getComputedStyle(root);
    const computedZIndex = style.zIndex;
    // Note that Safari returns a default zIndex of "0" for elements
    // with position: fixed, while Blink returns "auto".
    if (computedZIndex === 'auto' ||
      (style.position === 'fixed' && computedZIndex === '0')) {
      // Assign default z-index.
      root.style.zIndex = maxZIndexInUse() + 1;
    }

    // Give the overlay focus.
    root.focus();
  } else {
    // Remove previously assigned z-index.
    root.style.zIndex = null;
  }
}