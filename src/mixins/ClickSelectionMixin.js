export default function ClickSelectionMixin(Base) {
  return class ClickSelection extends Base {

    constructor(props) {
      super(props);
      this.click = this.click.bind(this);
    }

    click(event) {
      // REVIEW: is this the best way to reliably map the event target to a
      // child?
      const parent = event.target.parentNode;
      const targetIndex = [].indexOf.call(parent.children, event.target);
      if (targetIndex >= 0) {
        this.selectedIndexChanged(targetIndex);
      }
    }

    listProps() {
      const base = super.listProps ? super.listProps() : {};
      return Object.assign({}, base, {
        onClick: this.click
      });
    }
    
  };
}
