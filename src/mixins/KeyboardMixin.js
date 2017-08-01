export default function KeyboardMixin(Base) {
  return class Keyboard extends Base {

    get defaults() {
      return Object.assign({}, super.defaults, {
        tabIndex: this.props.tabIndex || 0
      });
    }

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
        tabIndex: this.defaults.tabIndex
      });
    }
    
  };
}
