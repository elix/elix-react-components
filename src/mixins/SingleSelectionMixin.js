export default function SingleSelectionMixin(Base) {
  return class SingleSelection extends Base {

    constructor(props) {
      super(props);
      this.state = Object.assign({}, this.state, {
        selectedIndex: parseInt(this.props.selectedIndex || -1)
      });
    }

    componentWillReceiveProps(props) {
      if (this.state.selectedIndex !== props.selectedIndex) {
        this.setState({
          selectedIndex: props.selectedIndex
        });
      }
    }

    selectedIndexChanged(index) {
      const changed = this.state.selectedIndex !== index;
      if (changed) {
        if (this.props.onSelectedIndexChanged) {
          this.props.onSelectedIndexChanged(index);
        } else {
          this.setState({
            selectedIndex: newIndex
          });
        }
      }
      return changed;
    }

    selectFirst() {
      if (super.selectFirst) { super.selectFirst(); }
      return this.selectedIndexChanged(Math.min(0, this.items.length - 1));
    }

    selectLast() {
      if (super.selectLast) { super.selectLast(); }
      return this.selectedIndexChanged(this.items.length - 1);
    }

    selectNext() {
      if (super.selectNext) { super.selectNext(); }
      return this.selectedIndexChanged(Math.min(this.state.selectedIndex + 1, this.items.length - 1));
    }

    selectPrevious() {
      if (super.selectPrevious) { super.selectPrevious(); }
      return this.selectedIndexChanged(Math.max(this.state.selectedIndex - 1, 0));
    }

  };
}
