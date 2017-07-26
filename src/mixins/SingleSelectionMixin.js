let testInvokeCount = 0;


export default function SingleSelectionMixin(Base) {
  return class SingleSelection extends Base {

    constructor(props) {
      super(props);
      this.state = Object.assign({}, this.state, {
        selectedIndex: parseInt(this.props.selectedIndex || -1)
      });
      this.selectedIndexChanged = this.selectedIndexChanged.bind(this);
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
          // console.log(++testInvokeCount);
          this.setState({
            selectedIndex: index
          });
        }
      }
      return changed;
    }

    selectFirst() {
      if (super.selectFirst) { super.selectFirst(); }
      return selectIndex(this, 0);
    }

    selectLast() {
      if (super.selectLast) { super.selectLast(); }
      return selectIndex(this, this.items.length - 1);
    }

    selectNext() {
      if (super.selectNext) { super.selectNext(); }
      return selectIndex(this, this.state.selectedIndex + 1);
    }

    selectPrevious() {
      if (super.selectPrevious) { super.selectPrevious(); }
      return selectIndex(this, this.state.selectedIndex - 1);
    }

  };
}


function selectIndex(component, index) {

  const items = component.items;
  if (items == null) {
    // Nothing to select.
    return false;
  }

  const count = items.length;
  const boundedIndex = component.props.selectionWraps ?
    // JavaScript mod doesn't handle negative numbers the way we want to wrap.
    // See http://stackoverflow.com/a/18618250/76472
    ((index % count) + count) % count :

    // Keep index within bounds of array.
    Math.max(Math.min(index, count - 1), 0);

  return component.selectedIndexChanged(boundedIndex);
}
