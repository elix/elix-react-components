export default function SingleSelectionMixin(Base) {
  return class SingleSelection extends Base {

    constructor(props) {
      super(props);
      this.state = Object.assign({}, this.state, {
        selectedIndex: parseInt(this.props.selectedIndex || -1)
      });
    }

    selectFirst() {
      //if (super.selectFirst) { super.selectFirst(); }
      return updateSelectedIndex(this, Math.min(0, this.items.length - 1));
    }

    selectLast() {
      //if (super.selectLast) { super.selectLast(); }
      return updateSelectedIndex(this, this.items.length - 1);
    }

    selectNext() {
      //if (super.selectNext) { super.selectNext(); }
      return updateSelectedIndex(this, Math.min(this.state.selectedIndex + 1, this.items.length - 1));
    }

    selectPrevious() {
      //if (super.selectPrevious) { super.selectPrevious(); }
      return updateSelectedIndex(this, Math.max(this.state.selectedIndex - 1, 0));
    }

  };
}


function updateSelectedIndex(component, newIndex) {
  const changed = component.state.selectedIndex !== newIndex;
  if (changed) {
    component.setState((prevState, props) => {
      return {
        selectedIndex: newIndex
      };
    });
  }
  return changed;
}
