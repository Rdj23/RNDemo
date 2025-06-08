/* eslint-env jest */
import 'react-native-gesture-handler/jestSetup';

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

// Silence Animated warnings by mocking the native helper
jest.mock('react-native/src/private/animated/NativeAnimatedHelper');

// Mock async storage
jest.mock(
  '@react-native-async-storage/async-storage',
  () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native-simple-toast', () => ({
  SHORT: 1,
  LONG: 2,
  show: jest.fn(),
}));

jest.mock('react-native-root-toast', () => ({
  show: jest.fn(),
  durations: {SHORT: 1, LONG: 2},
  positions: {TOP: 0, BOTTOM: -1},
}));
// Basic mock for clevertap-react-native to prevent native module errors
jest.mock('clevertap-react-native', () => {
  const mock = {
    addListener: jest.fn(() => ({ remove: jest.fn() })),
    removeListener: jest.fn(),
    removeListeners: jest.fn(),
    createNotificationChannel: jest.fn(),
    initializeInbox: jest.fn(),
    showInbox: jest.fn(),
    recordChargedEvent: jest.fn(),
    CleverTapInAppNotificationShowed: 'CleverTapInAppNotificationShowed',
    CleverTapInAppNotificationDismissed: 'CleverTapInAppNotificationDismissed',
    CleverTapInAppNotificationButtonTapped: 'CleverTapInAppNotificationButtonTapped',
    CleverTapInboxDidInitialize: 'CleverTapInboxDidInitialize',
    CleverTapInboxMessagesDidUpdate: 'CleverTapInboxMessagesDidUpdate',
  };
  return mock;
});