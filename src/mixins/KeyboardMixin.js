export default function KeyboardMixin(Base) {
  return class Keyboard extends Base {

    handleKeydown(event) {
      const handled = this.keydown(event);
      if (handled) {
        event.preventDefault();
        event.stopPropagation();
      }
    }

    listProps() {
      const base = super.listProps ? super.listProps() : {};
      return Object.assign({}, base, {
        onKeyDown: this.handleKeydown.bind(this),
        tabIndex: this.props.tabIndex || 0
      });
    }
    
  };
}
