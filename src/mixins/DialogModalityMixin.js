export default function DialogModalityMixin(Base) {
  return class DialogModality extends Base {

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

  }
}
