
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
  // If you remove the "-1", this will crash Edge 14.
  const maxSequence = fixture.children.length - 1;

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
