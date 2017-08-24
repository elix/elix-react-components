import React from 'react';
import ReactDOM from 'react-dom';


/**
 * A text area that makes itself big enough to show its content.
 *
 * This text input component is useful in situations where you want to ask the
 * user to enter as much text as they want, but don't want to take up a lot of
 * room on the page.
 *
 * The component works by copying the text to an invisible element which will
 * automatically grow in size; the expanding copy will expand the container,
 * which in turn will vertically stretch the text area to match.
 * 
 * TODO: Expose standard textarea properties.
 */
export default class AutosizeTextarea extends React.Component {

  constructor(props) {
    super(props);
    this.valueChange = this.valueChange.bind(this);
    this.state = {
      value: this.props.children
    };
  }

  componentDidMount() {
    // For auto-sizing to work, we need the text copy to have the same border,
    // padding, and other relevant characteristics as the original text area.
    // Since those aspects are affected by CSS, we have to wait until the
    // element is in the document before we can update the text copy.
    const textareaStyle = getComputedStyle(this.textarea);
    const minHeight = this.props.minimumRows && `${parseFloat(textareaStyle.height)}px`;
    const copyStyle = {
      borderBottomStyle: textareaStyle.borderBottomStyle,
      borderBottomWidth: textareaStyle.borderBottomWidth,
      borderLeftStyle: textareaStyle.borderLeftStyle,
      borderLeftWidth: textareaStyle.borderLeftWidth,
      borderRightStyle: textareaStyle.borderRightStyle,
      borderRightWidth: textareaStyle.borderRightWidth,
      borderTopStyle: textareaStyle.borderTopStyle,
      borderTopWidth: textareaStyle.borderTopWidth,
      minHeight: minHeight,
      paddingBottom: textareaStyle.paddingBottom,
      paddingLeft: textareaStyle.paddingLeft,
      paddingRight: textareaStyle.paddingRight,
      paddingTop: textareaStyle.paddingTop,
    };
    this.setState({
      copyStyle
    });
  }

  // TODO
  // componentWillReceiveProps(props) {
    // Handling live property changes after the first pass will require
    // changing how we set the minimum height of the text copy.
  // }

  render() {

    const style = {
      'position': 'relative'
    };

    const firstPass = !this.state.copyStyle;

    /*
     * Ensure both the text area and copy end up with the element's own font
     * metrics, so that text will lay out the same in both of them.
     */
    const sharedStyle = {
      'boxSizing': 'border-box',
      'fontFamily': 'inherit',
      'fontSize': 'inherit',
      'fontStyle': 'inherit',
      'fontWeight': 'inherit',
      'lineHeight': 'inherit',
      'margin': '0',
    };
    const textareaStyle = Object.assign(
      {
        'height': '100%',
        'overflow': 'hidden',
        'position': !firstPass && 'absolute',
        'resize': 'none',
        'top': '0',
        'width': '100%',
      },
      sharedStyle
    );
    const copyStyle = Object.assign(
      {
        'visibility': 'hidden',
        'whiteSpace': 'pre-wrap', /* So lines wrap */
        'wordWrap': 'break-word' /* So we break at word boundaries when possible */
      },
      sharedStyle,
      this.state.copyStyle
    );
    const extraSpaceStyle = {
      'display': 'inline-block',
      'width': 0
    };

    // We only set the rows attribute on the textarea in the first pass to
    // determine its minimum height. In subsequent passes, the minimum height
    // will be set as the minimum height on the text copy.
    const rows = firstPass && this.props.minimumRows;

    // The invisible copyContainer contains an extra space element that ensures
    // that, even if the last line of the textarea is blank, there will be
    // something in the line that forces the text copy to grow by a line.
    return (
      <div style={style}>
        <textarea
          ref={el => this.textarea = el}
          rows={rows}
          onChange={this.valueChange}
          style={textareaStyle}
          value={this.state.value}
          />
        <div ref={el => this.copy = el} style={copyStyle}>
          <span>{this.state.value}</span>
          <span style={extraSpaceStyle}>&nbsp;</span>
        </div>
      </div>
    );
  }

  valueChange(event) {
    if (this.props.onChange) {
      this.props.onChange(this);
    } else {
      this.setState({
        value: event.target.value
      });
    }
  }
}
