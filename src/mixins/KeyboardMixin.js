export default function KeyboardMixin(Base) {
  return class Keyboard extends Base {

    constructor(props) {
      super(props);
      this.handleKeydown = this.handleKeydown.bind(this);
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
        onKeyDown: this.handleKeydown,
        tabIndex: this.props.tabIndex || 0
      });
    }
    
  }
}
