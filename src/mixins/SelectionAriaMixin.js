export default function SelectionAriaMixin(Base) {
  return class SelectionAria extends Base {

    itemProps(item, index) {
      const base = super.itemProps ? super.itemProps() : {};
      return Object.assign({}, base, {
        'aria-selected': index === this.state.selectedIndex,
        role: 'option'
      });
    }

    listProps() {
      const base = super.listProps ? super.listProps() : {};
      return Object.assign({}, base, {
        'aria-label': this.props['aria-label'],
        role: 'listbox'
      });
    }

  }
}
