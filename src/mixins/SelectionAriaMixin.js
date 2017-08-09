export default function SelectionAriaMixin(Base) {
  return class SelectionAria extends Base {

    itemProps(item, index) {
      const base = super.itemProps ? super.itemProps(item, index) : {};
      const selected = index === this.state.selectedIndex;
      return Object.assign({}, base, {
        'aria-selected': selected,
        'role': 'option'
      });
    }

    rootProps() {
      const base = super.rootProps ? super.rootProps() : {};
      return Object.assign({}, base, {
        'aria-label': this.props['aria-label'],
        'role': 'listbox'
      });
    }

  };
}
