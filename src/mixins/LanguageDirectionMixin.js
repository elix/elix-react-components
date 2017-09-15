export default function LanguageDirectionMixin(Base) {
  return class LanguageDirection extends Base {

    componentDidMount() {
      if (super.componentDidMount) { super.componentDidMount(); }
      const root = this.root;
      if (root) {
        const direction = getComputedStyle(root).direction;
        if (this.state.direction !== direction) {
          this.setState({ direction });
        }
      }
    }

  }
}
