/**
 * Mixin which maps a click (actually, a mousedown) to an item selection.
 */
export default function ClickSelectionMixin(Base) {
  return class ClickSelection extends Base {

    click(event) {
      const targetIndex = indexForTarget(this, event.target);
      if (targetIndex >= 0) {
        this.selectedIndexChanged(targetIndex);
      }
    }

    listProps() {
      const base = super.listProps ? super.listProps() : {};
      return Object.assign(base, {
        onMouseDown: this.click.bind(this)
      });
    }
    
  };
}


/**
 * Return the index of the list child that is, or contains, the indicated target
 * node. Return null if not found.
 */
function indexForTarget(component, target) {
  const children = component.root.children;
  for (let index = 0; index < children.length; index++) {
    const child = children[index];
    if (child.contains(target)) {
      return index;
    }
  }
  return null;
}
