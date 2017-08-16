export default function VisualStateMixin(Base) {
  return class VisualState extends Base {

    constructor(props) {
      super(props);
      this.transitionEnd = this.transitionEnd.bind(this);
    }

    changeVisualState(visualState) {
      if (this.state.visualState !== visualState) {
        if (this.props.onChangeVisualState) {
          // Controlled component
          this.props.onChangeVisualState(visualState);
        } else {
          // Uncontrolled component
          this.setState({ visualState });
        }
      }
    }

    componentDidMount() {
      if (super.componentDidMount) { super.componentDidMount(); }
      transitionToNextVisualState(this, this.immediateTransitions);
    }
    
    componentDidUpdate() {
      if (super.componentDidUpdate) { super.componentDidUpdate(); }
      transitionToNextVisualState(this, this.immediateTransitions);
    }
    
    rootProps() {
      const base = super.rootProps ? super.rootProps() : {};
      const hasTransitions = this.transitionEndTransitions;
      return Object.assign({}, base, {
        onTransitionEnd: hasTransitions && this.transitionEnd
      });
    }
    
    transitionEnd() {
      transitionToNextVisualState(this, this.transitionEndTransitions);
    }

  }
}


function transitionToNextVisualState(component, transitions) {
  const currentVisualState = component.state.visualState
  const nextVisualState = transitions && transitions[currentVisualState];
  if (nextVisualState) {
    component.changeVisualState(nextVisualState);
  }
}
