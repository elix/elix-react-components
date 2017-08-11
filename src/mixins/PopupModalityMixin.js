/**
 * This mixin makes an overlay behave like a popup by dismissing it when certain
 * user interactions occur.
 * 
 * This mixin expects the component to provide:
 * 
 * * An open/close API compatible with `OpenCloseMixin`.
 * 
 * The mixin provides these features to the component:
 * 
 * * Event handlers that close the element if the user clicks outside the
 *   element, presses the Esc key, moves the focus outside the element, scrolls
 *   the document, resizes the document, or switches focus away from the
 *   document.
 * * A default ARIA role of `alert`.
 * 
 * For modal overlays, use `DialogModalityMixin` instead. See the documentation
 * of that mixin for a comparison of modality behaviors.
 */
export default function PopupModalityMixin(Base) {
  return class PopupModality extends Base {

    constructor(props) {
      super(props);
      this.blur = this.blur.bind(this);
      this.closeHandler = this.closeHandler.bind(this);
    }

    blur() {
      this.close();
    }

    closeHandler(event) {
      const root = this.root;
      const insideEvent = root === event.target ||
        (event.target instanceof Node && root.contains(event.target));
      if (!insideEvent) {
        this.close();
      }
    }

    componentDidUpdate() {
      if (super.componentDidUpdate) { super.componentDidUpdate(); }
      if (this.state.opened) {
        addEventListeners(this);
      } else {
        removeEventListeners(this);
      }
    }

    get defaults() {
      return Object.assign({}, super.defaults, {
        role: 'alert'
      });
    }

    // Close on Esc key.
    keydown(event) {
      let handled = false;

      switch (event.keyCode) {
        case 27: // Escape
          this.close();
          handled = true;
          break;
      }

      // Prefer mixin result if it's defined, otherwise use base result.
      return handled || (super.keydown && super.keydown(event)) || false;
    }

    rootProps() {
      const base = super.rootProps ? super.rootProps() : {};
      return Object.assign({}, base, {
        onBlur: this.blur
      });
    }

  }
}


function addEventListeners(component) {
  document.addEventListener('click', component.closeHandler);
  document.addEventListener('keydown', component.closeHandler);
  window.addEventListener('blur', component.closeHandler);
  window.addEventListener('resize', component.closeHandler);
  window.addEventListener('scroll', component.closeHandler);
}


// Stop closing on window blur/resize/scroll.
function removeEventListeners(component) {
  document.removeEventListener('click', component.closeHandler);
  document.removeEventListener('keydown', component.closeHandler);
  window.removeEventListener('blur', component.closeHandler);
  window.removeEventListener('resize', component.closeHandler);
  window.removeEventListener('scroll', component.closeHandler);
}
