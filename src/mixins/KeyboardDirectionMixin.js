export default function KeyboardDirectionMixin(Base) {
  return class KeyboardDirection extends Base {

    keydown(event) {
      let handled = false;

      switch (event.keyCode) {

        case 38: // Up
          handled = this.goUp();
          break;

        case 40: // Down
          handled = this.goDown();
          break;
      }

      // Prefer mixin result if it's defined, otherwise use base result.
      return handled || (super.keydown && super.keydown(event)) || false;
    }

  }
}
