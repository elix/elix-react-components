import ReactDOM from 'react-dom';

import dialogDemo from './src/dialogDemo';
import drawerDemo from './src/drawerDemo';
import horizontalListDemo from './src/horizontalListDemo';
import listBoxDemo from './src/listBoxDemo';
// import listBoxElement from './src/listBoxElement';
import modesWithKeyboardDemo from './src/modesWithKeyboardDemo';
import popupDemo from './src/popupDemo';
import tabsDemo from './src/tabsDemo';
import tabStripDemo from './src/tabStripDemo';
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
  dialogDemo,
  drawerDemo,
  horizontalListDemo,
  listBoxDemo,
  // listBoxElement,
  loadDemo,
  modesWithKeyboardDemo,
  popupDemo,
  tabsDemo,
  tabStripDemo,
  toastDemo,
  toolbarTabsDemo
});
