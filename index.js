
// importing any libraries that expect it to be set up.
import 'react-native/Libraries/Core/InitializeCore';

import '@react-native/js-polyfills/error-guard';

if (!global.ErrorUtils) {
    // eslint-disable-next-line no-undef
    global.ErrorUtils = require('react-native/Libraries/vendor/core/ErrorUtils');
} else if (typeof global.ErrorUtils.reportFatalError !== 'function') {
  global.ErrorUtils.reportFatalError = error => {
    console.error('[reportFatalError]', error);
  }
};
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App.js';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
