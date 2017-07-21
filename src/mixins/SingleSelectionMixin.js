export default function SingleSelectionMixin(Base) {
  return class SingleSelection extends Base {

    constructor(props) {
      super(props);
      this.state = Object.assign({}, this.state, {
        selectedIndex: parseInt(this.props.selectedIndex || -1)
      });
    }

    itemProps(item, index) {
      const base = super.itemProps ? super.itemProps(item, index) : {};
      // const className = index === this.state.selectedIndex ? 'selected' : '';
      // return Object.assign({}, base, { className });
      return base;
    }

    selectFirst() {
      if (super.selectFirst) { return super.selectFirst(); }
      this.setState((prevState, props) => {
        const newIndex = Math.min(0, props.children.length - 1);
        return {
          selectedIndex: newIndex
        };
      });
      
      // TODO: Return true if index moved, false otherwise.
      return true;
    }

    selectLast() {
      if (super.selectLast) { return super.selectLast(); }
      this.setState((prevState, props) => {
        const newIndex = props.children.length - 1;
        return {
          selectedIndex: newIndex
        };
      });
      
      // TODO: Return true if index moved, false otherwise.
      return true;
    }

    selectNext() {
      if (super.selectNext) { return super.selectNext(); }
      this.setState((prevState, props) => {
        const selectedIndex = prevState.selectedIndex;
        const newIndex = Math.min(selectedIndex + 1, props.children.length - 1);
        return {
          selectedIndex: newIndex
        };
      });
      
      // TODO: Return true if index moved, false otherwise.
      return true;
    }

    selectPrevious() {
      if (super.selectPrevious) { return super.selectPrevious(); }
      this.setState((prevState, props) => {
        const selectedIndex = prevState.selectedIndex;
        const newIndex = Math.max(selectedIndex - 1, 0);
        return {
          selectedIndex: newIndex
        };
      });

      // TODO: Return true if index moved, false otherwise.
      return true;
    }

  };
}
