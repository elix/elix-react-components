
import ReactTestUtils from 'react-dom/test-utils';

export default function(root) {
  console.log(`testing`);
  const fixture = root.children[0];
  fixture.focus();
  
  // Press Down arrow key once to select first item.
  ReactTestUtils.Simulate.keyDown(fixture, { keyCode: 40 });
  let total = 1;
  let sequence = 1;

  // Number of times we'll press Down or Up arrow key in a row.
  //
  // Since the first item starts out selected, this ends up being one *more*
  // than the number of times we actually need to press the key to leave the
  // last (or first) item selected. The last key in the sequence will not be
  // handled by the component, and will bubble up; the browser will do its
  // default action.
  //
  // In ES6 + Edge 14, this line causes a hang. Adding " - 1" to the end of the
  // line, to press the Down/Up keys exactly the right number of times to go
  // back and forth through the list without generating extra unhandled key
  // presses, allows the test to work in ES6 + Edge 14 without crashing.
  //
  const maxSequence = fixture.children.length;

  // Start by going down.
  let down = true;

  const interval = setInterval(() => {
    if (document.activeElement !== fixture) {
      // Break
      clearInterval(interval);
    }
    console.log(`${down ? 'down' : 'up'} sequence ${sequence}  total ${total}`);

    const keyCode = down ?
      40 :  // Down arrow
      38;   // Up arrow
    ReactTestUtils.Simulate.keyDown(fixture, { keyCode });

    total++;
    sequence++;
    if (sequence > maxSequence) {
      // Switch directions and restart sequence.
      down = !down;
      sequence = 1;
    }
  }, 25);
}
