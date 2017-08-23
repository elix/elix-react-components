export default function HoverMixin(Base) {
  return class Hover extends Base {

    constructor(props) {
      super(props);
      this.mouseEnter = this.mouseEnter.bind(this);
      this.mouseLeave = this.mouseLeave.bind(this);
      this.state = Object.assign({}, this.state, {
        hover: false
      });
    }

    mouseEnter(event) {
      if (super.mouseEnter) { super.mouseEnter(event); }
      this.setState({
        hover: true
      });
    }

    mouseLeave(event) {
      if (super.mouseLeave) { super.mouseLeave(event); }
      this.setState({
        hover: false
      });
    }

    rootProps() {
      const base = super.rootProps ? super.rootProps() : {};
      return Object.assign({}, base, {
        onMouseEnter: this.mouseEnter,
        onMouseLeave: this.mouseLeave
      });
    }

  }
}