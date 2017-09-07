import ReactDOM from 'react-dom';

import autosizeTextareaDemo from './src/autosizeTextareaDemo';
import dialogDemo from './src/dialogDemo';
import drawerDemo from './src/drawerDemo';
import horizontalListDemo from './src/horizontalListDemo';
import listBoxDemo from './src/listBoxDemo';
import modesWithKeyboardDemo from './src/modesWithKeyboardDemo';
import popupDemo from './src/popupDemo';
import responsiveDrawerDemo from './src/responsiveDrawerDemo';
import slidingCarouselAccessoriesDemo from './src/slidingCarouselAccessoriesDemo';
import slidingCarouselDemo from './src/slidingCarouselDemo';
import spreadDemo from './src/spreadDemo';
import swipeDemo from './src/swipeDemo';
import tabsDemo from './src/tabsDemo';
import tabStripDemo from './src/tabStripDemo';
import themedDemo from './src/themed/themedDemo';
import toastDemo from './src/toastDemo';
import toolbarTabsDemo from './src/toolbarTabsDemo';


function loadDemo(demo) {
  window.addEventListener('load', () => {
    const container = document.querySelector('#demo');
    ReactDOM.render(demo(), container);
  });
}


// Expose demos on window object so demo pages can load them.
Object.assign(window, {
  autosizeTextareaDemo,
  dialogDemo,
  drawerDemo,
  horizontalListDemo,
  listBoxDemo,
  loadDemo,
  modesWithKeyboardDemo,
  popupDemo,
  responsiveDrawerDemo,
  slidingCarouselAccessoriesDemo,
  slidingCarouselDemo,
  spreadDemo,
  swipeDemo,
  tabsDemo,
  tabStripDemo,
  themedDemo,
  toastDemo,
  toolbarTabsDemo
});
