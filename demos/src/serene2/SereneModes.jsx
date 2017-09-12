import React from 'react';
import ReactDOM from 'react-dom';

import Modes from '../../../src/components/Modes';
import VisualStateMixin from '../../../src/mixins/VisualStateMixin';


const Base = VisualStateMixin(Modes);


export default class SereneModes extends Base {

  // constructor(props) {
  //   super(props)
  //   const visualState = props.selected ? 'opaque' : 'deselected';
  //   this.state = Object.assign({}, this.state, { visualState });
  //   this.immediateTransitions = {
  //     'selected': 'opaque'
  //   };
  //   this.transitionEndTransitions = {
  //     'transparent': 'deselected'
  //   };
  // }

  // componentDidUpdate() {
  //   if (super.componentDidUpdate) { super.componentDidUpdate(); }
  //   if (this.props.selected && this.state.visualState === 'deselected') {
  //     this.changeVisualState('selected');
  //   } else if (!this.props.selected && this.state.visualState === 'opaque') {
  //     this.changeVisualState('transparent');
  //   }
  // }

  itemProps(item, index) {
    const base = super.itemProps(item, index);
    const opacity = index === this.state.selectedIndex ? 1 : 0;
    const style = Object.assign({}, base, {
      'background': 'white',
      'display': '',
      opacity,
      'padding': '0 33px',
      'position': 'absolute',
      'transition': 'opacity 0.75s'
    });
    return Object.assign({}, base, { style });
  }

  // render() {
  //   const rootProps = this.rootProps();
  //   const visualState = this.state.visualState;
  //   const opaqueStyle = {
  //     'opacity': 1
  //   };
  //   const transparentStyle = {
  //     'zIndex': 1
  //   };
  //   const visibleStyle = {
  //     'display': 'block'
  //   };
  //   rootProps.style = Object.assign(
  //     {},
  //     rootProps.style,
  //     this.props.style,
  //     {
  //       'background': 'white',
  //       'left': 0,
  //       'opacity': 0,
  //       'padding': '0 32px 32px 32px',
  //       'position': 'absolute',
  //       'right': 0,
  //       'transition': 'opacity 0.75s ease-out'
  //     },
  //     visualState !== 'deselected' && visibleStyle,
  //     visualState === 'transparent' && transparentStyle,
  //     visualState === 'opaque' && opaqueStyle
  //   );
  //   return (
  //     <div {...rootProps} aria-label={this.props['aria-label']}>
  //       {this.props.children}
  //     </div>
  //   );
  // }

  rootProps() {
    const base = super.rootProps ? super.rootProps() : {};
    const style = Object.assign({}, base.style, {
      'display': 'block',
    });
    return Object.assign({}, base, { style });
  }

}
