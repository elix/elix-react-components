import Symbol from '../mixins/Symbol.js';


// Symbols for private data members.
const previousBodyOverflowKey = Symbol('previousBodyStyleOverflow');
const previousDocumentMarginRightKey = Symbol('previousDocumentMarginRight');


/**
 * This mixin blocks various user interactions to make an overlay behave like a
 * modal dialog. This mixin is generally used in conjunction with a backdrop.
 * 
 * This mixin expects the component to provide:
 * 
 * * An open/close API compatible with `OverlayMixin`.
 * 
 * The mixin provides these features to the component:
 * 
 * * Disables scrolling on the background document. **This is a global
 *   side-effect of opening the component.**
 * * A default ARIA role of `dialog`.
 * * Closes the element if user presses the Esc key.
 * 
 * For modeless overlays, see `PopupModalityMixin` instead.
 * 
 * @module DialogModalityMixin
 */
export default function DialogModalityMixin(Base) {
  return class DialogModality extends Base {

    componentDidUpdate() {
      if (super.componentDidUpdate) { super.componentDidUpdate(); }
      if (this.state.opened) {
        disableDocumentScrolling(this);
      } else {
        enableDocumentScrolling(this);
      }
    }

    componentWillUnmount() {
      if (super.componentWillUnmount) { super.componentWillUnmount(); }
      enableDocumentScrolling(this);
    }

    get defaults() {
      return Object.assign({}, super.defaults, {
        role: 'dialog'
      });
    }

    keydown(event) {
      let handled = false;

      switch (event.keyCode) {

        case 27: // Escape
          // Close on Esc key.
          this.openedChanged(false);
          handled = true;
          break;
      }

      // Prefer mixin result if it's defined, otherwise use base result.
      return handled || (super.keydown && super.keydown(event)) || false;
    }

    rootProps() {
      const base = super.rootProps() || {};
      const role = this.props.role || this.defaults.role;
      return Object.assign({}, base, { role });
    }

  }
}


// Mark body as non-scrollable, to absorb space bar keypresses and other
// means of scrolling the top-level document.
function disableDocumentScrolling(component) {
  const scrollBarWidth = window.innerWidth - document.body.clientWidth;
  component[previousBodyOverflowKey] = document.body.style.overflow;
  component[previousDocumentMarginRightKey] = scrollBarWidth > 0 ?
    document.documentElement.style.marginRight :
    null;
  document.body.style.overflow = 'hidden';
  if (scrollBarWidth > 0) {
    document.documentElement.style.marginRight = `${scrollBarWidth}px`;
  }
}


function enableDocumentScrolling(component) {
  if (component[previousBodyOverflowKey] != null) {
    document.body.style.overflow = component[previousBodyOverflowKey];
    component[previousBodyOverflowKey] = null;
  }
  if (component[previousDocumentMarginRightKey] != null) {
    document.documentElement.style.marginRight = component[previousDocumentMarginRightKey];
    component[previousDocumentMarginRightKey] = null;
  }
}
