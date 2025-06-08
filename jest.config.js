module.exports = {
  preset: 'react-native',
   setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|@react-navigation' +
      '|react-native-reanimated' +
      '|react-native-gesture-handler' +
      '|react-native-drawer-layout' +
      '|react-native-screens' +
      '|react-native-safe-area-context' +
      '|clevertap-react-native' +
    ')/)'
  ],
};
