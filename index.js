// Stub out missing ErrorUtils.reportFatalError so LogBoxData won’t crash
 if (!global.ErrorUtils || typeof global.ErrorUtils.reportFatalError !== 'function') {
  global.ErrorUtils = {
     reportFatalError: (error, isFatal = false) => {
       console.error(
         `[reportFatalError] ${isFatal ? 'Fatal:' : ''}`,
         error
       );
     },
   };
 }

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App.js';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
