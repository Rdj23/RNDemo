
// importing any libraries that expect it to be set up.
import 'react-native/Libraries/Core/InitializeCore';

import ErrorUtilsVendor from 'react-native/Libraries/vendor/core/ErrorUtils';

import '@react-native/js-polyfills/error-guard';

if (!global.ErrorUtils) {
   global.ErrorUtils = ErrorUtilsVendor;
} else if (typeof global.ErrorUtils.reportFatalError !== 'function') {
  global.ErrorUtils.reportFatalError = error => {
    console.error('[reportFatalError]', error);
  };
}
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App.js';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
