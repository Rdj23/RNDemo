
// Ensure React Native's error handling is initialized before anything uses it
// so that `ErrorUtils.reportFatalError` always exists.
import '@react-native/js-polyfills/error-guard';
import 'react-native/Libraries/Core/InitializeCore';

// Polyfill ErrorUtils early so modules can safely use it
if (!global.ErrorUtils) {
  global.ErrorUtils = {
    _globalHandler: undefined,
    getGlobalHandler() {
      return global.ErrorUtils._globalHandler;
    },
    setGlobalHandler(handler) {
      global.ErrorUtils._globalHandler = handler;
    },
    reportError(error) {
      const handler = global.ErrorUtils._globalHandler;
      if (handler) {
        handler(error, false);
      } else {
        console.error('ErrorUtils caught an error', error);
      }
    },
    reportFatalError(error, isFatal = true) {
      const handler = global.ErrorUtils._globalHandler;
      if (handler) {
        handler(error, isFatal);
      } else {
        console.error(`[reportFatalError] ${isFatal ? 'Fatal:' : ''}`, error);
      }
    },
    inGuard() {
      return false;
    },
    applyWithGuard(fn, context, args) {
      try {
        return fn.apply(context, args);
      } catch (e) {
        global.ErrorUtils.reportError(e);
        return undefined;
      }
    },
    applyWithGuardIfNeeded(fn, context, args) {
      return global.ErrorUtils.applyWithGuard(fn, context, args);
    },
    guard(fn, name, context) {
      return (...args) =>
        global.ErrorUtils.applyWithGuard(fn, context ?? null, args);
    },
  };
} else if (
  typeof global.ErrorUtils.reportFatalError !== 'function'
) {
  global.ErrorUtils.reportFatalError = (error, isFatal = true) => {
    console.error(`[reportFatalError] ${isFatal ? 'Fatal:' : ''}`, error);
  };
}
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App.js';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
