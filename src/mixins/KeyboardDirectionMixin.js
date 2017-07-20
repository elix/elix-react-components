export default function KeyboardDirectionMixin(Base) {
  return class KeyboardDirection extends Base {

    keydown(event) {
      let handled = false;

      // TODO
      const horizontal = false;
      const vertical = true;

      // Ignore Left/Right keys when metaKey or altKey modifier is also pressed,
      // as the user may be trying to navigate back or forward in the browser.
      switch (event.keyCode) {
        case 35: // End
          handled = this.goEnd();
          break;
        case 36: // Home
          handled = this.goStart();
          break;
        case 37: // Left
          if (horizontal && !event.metaKey && !event.altKey) {
            handled = this.goLeft();
          }
          break;
        case 38: // Up
          if (vertical) {
            handled = event.altKey ? this.goStart() : this.goUp();
          }
          break;
        case 39: // Right
          if (horizontal && !event.metaKey && !event.altKey) {
            handled = this.goRight();
          }
          break;
        case 40: // Down
          if (vertical) {
            handled = event.altKey ? this.goEnd() : this.goDown();
          }
          break;
      }

      // Prefer mixin result if it's defined, otherwise use base result.
      return handled || (super.keydown && super.keydown(event)) || false;
    }

  }
}
