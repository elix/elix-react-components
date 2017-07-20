export default function SingleSelectionMixin(Base) {
  return class SingleSelection extends Base {

    constructor(props) {
      super(props);
      this.state = {
        selectedIndex: parseInt(this.props.selectedIndex || -1)
      };
    }

    itemProps(item, index) {
      const base = super.itemProps ? super.itemProps(item, index) : {};
      const className = index === this.state.selectedIndex ? 'selected' : '';
      return Object.assign({}, base, { className });
    }

  }
}
