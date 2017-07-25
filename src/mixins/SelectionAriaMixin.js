export default function SelectionAriaMixin(Base) {
  return class SelectionAria extends Base {

    itemProps() {
      const base = super.itemProps ? super.itemProps() : {};
      return Object.assign({}, base, {
        'aria-selected': false,
        role: 'option'
      });
    }

    selectedItemProps() {
      const base = super.selectedItemProps ? super.selectedItemProps() : {};
      return Object.assign({}, base, {
        'aria-selected': true
      });
    }

    listProps() {
      const base = super.listProps ? super.listProps() : {};
      return Object.assign(base, {
        'aria-label': this.props['aria-label'],
        role: 'listbox'
      });
    }

  };
}
