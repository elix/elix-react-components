export default function TransitionMixin(Base) {
  return class Transition extends Base {

    constructor(props) {
      super(props);
      this.transitionEnd = this.transitionEnd.bind(this);

      // If the component has been created to render in its opened state, then
      // we'll skip the transition and render it already expanded.
      if (this.props.opened) {
        this.state = Object.assign({}, this.state, {
          expanded: true
        });
      }
    }

    componentDidMount() {
      if (super.componentDidMount) { super.componentDidMount(); }
      updateExpandedState(this);
    }

    componentDidUpdate() {
      if (super.componentDidUpdate) { super.componentDidUpdate(); }
      updateExpandedState(this);
    }

    componentWillReceiveProps(props) {
      if (super.componentWillReceiveProps) { super.componentWillReceiveProps(props); }
      if (props.expanded !== this.state.expanded) {
        this.setState({
          expanded: props.expanded
        });
      }
    }

    componentWillUnmount() {
      if (super.componentWillUnmount) { super.componentWillUnmount(); }
      // If we're unmounted *during* transition, we won't receive transitionend
      // event, so do that work now.
      reset(this);
    }

    rootProps() {
      const base = super.rootProps ? super.rootProps() : {};
      return Object.assign({}, base, {
        onTransitionEnd: this.transitionEnd
      });
    }

    transitionEnd() {
      reset(this);
    }

  }
}


function reset(component) {
  if (component.state.opened && !component.state.expanded) {
    component.setState({
      opened: false,
      expanded: null
    });
  }
}


function updateExpandedState(component) {
  if (component.state.opened) {
    if (component.state.expanded == null) {
      // Component has been rendered as opened but not expanded.
      // Now that it's visible, render the expansion transition.
      component.setState({
        expanded: true
      });
    }
  } else if (component.state.expanded) {
    // The opened property must have been set directly to false, hiding the
    // overlay. We update our internal state such that the next time the
    // overlay is opened, the expansion transition will play.
    component.setState({
      expanded: null
    });
  }
}