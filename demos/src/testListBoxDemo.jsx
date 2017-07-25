
import ReactTestUtils from 'react-dom/test-utils';

export default function(root) {
  console.log(`testing`);
  const fixture = root.children[0];
  fixture.focus();
  let i = 0;
  let down = true;
  const interval = setInterval(() => {
    if (document.activeElement !== fixture) {
      // Break
      clearInterval(interval);
    }
    const keyCode = down ? 40 : 38;
    ReactTestUtils.Simulate.keyDown(fixture, { keyCode });
    i += down ? 1 : -1;
    if (down && i > 45) {
      down = false;
    } else if (!down && i < -5) {
      down = true;
    }
  }, 50);
}
