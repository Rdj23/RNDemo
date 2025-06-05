// babel.config.js (React Native 0.79+)
module.exports = {
  presets: [
    // NOTE: in RN 0.79 and later, this must be "@react-native/babel-preset"
    '@react-native/babel-preset'
  ],
  plugins: [
    // If you are using Reanimated v2+, keep this plugin last:
    'react-native-reanimated/plugin',
  ],
};
