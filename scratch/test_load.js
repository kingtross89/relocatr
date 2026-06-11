const fs = require('fs');
const path = require('path');
const vm = require('vm');

const relPath = (file) => path.join(__dirname, '..', file);

// Set up fake window / DOM
const domElements = {};
const getElementById = (id) => {
  // console.log('getElementById called for:', id);
  if (!domElements[id]) {
    domElements[id] = {
      id,
      style: {},
      classList: {
        add: () => {},
        remove: () => {},
        toggle: () => {},
      },
      addEventListener: () => {},
      appendChild: () => {},
      insertBefore: () => {},
      querySelector: (sel) => {
        // console.log('querySelector called on element for:', sel);
        return {
          style: {},
          classList: {
            add: () => {},
            remove: () => {},
            toggle: () => {},
          },
          addEventListener: () => {},
        };
      },
      querySelectorAll: () => [],
      cloneNode: function() { return this; },
      parentNode: {
        replaceChild: () => {}
      }
    };
  }
  return domElements[id];
};

const fakeWindow = {
  PRELOAD_FROM: 'US',
  PRELOAD_TO: 'AR',
  location: {
    pathname: '/routes/us-to-ar/',
    search: '',
    origin: 'https://myrelocatr.com',
    protocol: 'https:'
  },
  history: {
    replaceState: () => {},
    pushState: () => {}
  },
  scrollTo: () => {},
  addEventListener: () => {},
  document: {
    getElementById,
    querySelector: (sel) => {
      // console.log('document.querySelector called for:', sel);
      if (sel.startsWith('#')) return getElementById(sel.substring(1));
      return {
        style: {},
        classList: { add: () => {}, remove: () => {}, toggle: () => {} },
        addEventListener: () => {},
        querySelector: () => null,
        querySelectorAll: () => []
      };
    },
    querySelectorAll: (sel) => {
      // console.log('document.querySelectorAll called for:', sel);
      return [];
    },
    createElement: (tag) => {
      // console.log('createElement called for:', tag);
      return {
        style: {},
        classList: { add: () => {}, remove: () => {}, toggle: () => {} },
        addEventListener: () => {}
      };
    },
    body: {
      classList: { add: () => {}, remove: () => {}, toggle: () => {} }
    }
  },
  console: console
};

// Add standard browser globals
fakeWindow.window = fakeWindow;
fakeWindow.document.defaultView = fakeWindow;

const context = vm.createContext(fakeWindow);

console.log('Loading data.js...');
const dataCode = fs.readFileSync(relPath('data.js'), 'utf8');
vm.runInContext(dataCode, context, { filename: 'data.js' });

console.log('Loading app.js...');
const appCode = fs.readFileSync(relPath('app.js'), 'utf8');
try {
  vm.runInContext(appCode, context, { filename: 'app.js' });
  console.log('app.js loaded successfully!');
} catch (e) {
  console.error('Error during app.js execution:', e);
}
