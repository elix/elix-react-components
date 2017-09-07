// We assume that the keyboard changed the focus unless we have proof otherwise.
let focusedWithKeyboard = true;

// Flag used to track keyboard focus state across window blur/focus events.
let previousFocusedWithKeyboard;

// Shared event listener for all components using this mixin.
let windowFocusListener;


export default function FocusMixin(Base) {
  return class Focus extends Base {

    constructor(props) {
      super(props);
      this.state = Object.assign({}, this.state, {
        focusRing: false
      });
      this.blur = this.blur.bind(this);
      this.focus = this.focus.bind(this);
      this.mousedown = this.mousedown.bind(this);

      // We only want to start listening to window focus events if an element
      // using this mixin is actually instantiated, and we only do that for the
      // first such element. All elements can share that window focus listeners.
      if (windowFocusListener == null) {
        windowFocusListener = window.addEventListener('focus', windowFocused);

        // Firefox does not appear to listen to focus events on the window.
        // We listen to focus events on the document instead. There does not
        // appear to be a browser that listens to focus on both window and
        // document, so wiring up focus listeners to both seems to be safe.
        document.addEventListener('focus', windowFocused);
      }
    }

    blur(event) {
      if (super.blur) { super.blur(event); }
      this.setState({
        focusRing: false
      });
    }

    focus(event) {
      if (super.focus) { super.focus(event); }

      this.setState({
        focusRing: focusedWithKeyboard
      });

      // Remember how focus changed in case window loses focus.
      previousFocusedWithKeyboard = focusedWithKeyboard;

      // Go back to assuming use of the keyboard.
      focusedWithKeyboard = true;
    }

    // For use with KeyboardMixin
    keydown(event) {
      const result = super.keydown && super.keydown(event);
      if (!this.state.focusRing) {
        // User set focus on component with mouse, but is now using keyboard.
        this.setState({
          focusRing: true
        });
      }
      return result;
    }

    mousedown(event) {
      if (super.mousedown) { super.mousedown(event); }
      // If an element receives focus, it won't be because of the keyboard.
      focusedWithKeyboard = false;
    }

    rootProps() {
      const base = super.rootProps ? super.rootProps() : {};
      return Object.assign({}, base, {
        onBlur: this.blur,
        onFocus: this.focus,
        onMouseDown: this.mousedown
      });
    }
  }
}


// The window has regained focus after having lost it. If the last
// element that had the focus obtained the focus via the keyboard,
// set our keyboard input flag. That previously-focused element is
// about to receive a focus event, and the handler for that can then
// treat the situation as if the focus was obtained via the keyboard.
// That helps a keyboard user reacquire the focused element when
// returning to the window.
function windowFocused() {
  focusedWithKeyboard = previousFocusedWithKeyboard;
}
