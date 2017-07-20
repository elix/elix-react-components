export default function DirectionSelectionMixin(Base) {
  return class DirectionSelection extends Base {

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

    goEnd() {
      this.setState((prevState, props) => {
        const newIndex = props.children.length - 1;
        return {
          selectedIndex: newIndex
        };
      });
      
      // TODO: Return true if index moved, false otherwise.
      return true;
    }

    // TODO
    goLeft() {}

    // TODO
    goRight() {}

    goStart() {
      this.setState((prevState, props) => {
        const newIndex = Math.min(0, props.children.length - 1);
        return {
          selectedIndex: newIndex
        };
      });
      
      // TODO: Return true if index moved, false otherwise.
      return true;
    }

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

  }
}
