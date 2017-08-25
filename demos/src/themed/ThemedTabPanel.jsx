import React from 'react';
import ReactDOM from 'react-dom';

import VisualStateMixin from '../../../src/mixins/VisualStateMixin';


const Base = VisualStateMixin(React.Component);


export default class ThemedTabPanel extends Base {

  constructor(props) {
    super(props)
    const visualState = props.selected ? 'opaque' : 'deselected';
    this.state = Object.assign({}, this.state, { visualState });
    this.immediateTransitions = {
      'selected': 'opaque'
    };
    this.transitionEndTransitions = {
      'transparent': 'deselected'
    };
  }

  componentDidUpdate() {
    if (super.componentDidUpdate) { super.componentDidUpdate(); }
    if (this.props.selected && this.state.visualState === 'deselected') {
      this.changeVisualState('selected');
    } else if (!this.props.selected && this.state.visualState === 'opaque') {
      this.changeVisualState('transparent');
    }
  }

  render() {
    const rootProps = this.rootProps();
    const visualState = this.state.visualState;
    const opaqueStyle = {
      'opacity': 1
    };
    const visibleStyle = {
      'display': 'block'
    };
    rootProps.style = Object.assign(
      {},
      rootProps.style,
      this.props.style,
      {
        'background': 'white',
        'left': 0,
        'opacity': 0,
        'padding': '0 32px 32px 32px',
        'position': 'absolute',
        'right': 0,
        'transition': 'opacity 0.6s ease-out'
      },
      visualState !== 'deselected' && visibleStyle,
      visualState === 'opaque' && opaqueStyle
    );
    return (
      <div {...rootProps} aria-label={this.props['aria-label']}>
        {this.props.children}
      </div>
    );
  }

}
