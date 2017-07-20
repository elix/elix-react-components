export default function DirectionSelectionMixin(Base) {
  return class DirectionSelection extends Base {

    goUp() {
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

    goDown() {
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

  }
}
