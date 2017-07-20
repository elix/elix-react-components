export default function KeyboardMixin(Base) {
  return class Keyboard extends Base {

    constructor(props) {
      super(props);
      this.keydown = this.keydown.bind(this);
    }

    listProps() {
      const base = super.listProps ? super.listProps() : {};
      return Object.assign({}, base, {
        onKeyDown: this.keydown,
        tabIndex: this.props.tabIndex || 0
      });
    }
    
  }
}
