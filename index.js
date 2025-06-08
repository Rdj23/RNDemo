

// Ensure ErrorUtils has a reportFatalError method so crashes are logged
if (!global.ErrorUtils?.reportFatalError) {
  global.ErrorUtils = {
    ...(global.ErrorUtils || {}),
    reportFatalError: (error, isFatal = false) => {
      console.error(`[reportFatalError] ${isFatal ? 'Fatal:' : ''}`, error);
    },
  };
}
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App.js';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
