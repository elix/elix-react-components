
import ReactTestUtils from 'react-dom/test-utils';

export default function(root) {
  console.log(`testing`);
  const fixture = root.children[0];
  fixture.focus();
  const interval = setInterval(() => {
    if (document.activeElement !== fixture) {
      // Break
      clearInterval(interval);
    }
    ReactTestUtils.Simulate.keyDown(fixture, { keyCode : 40 });
  }, 50);
}
