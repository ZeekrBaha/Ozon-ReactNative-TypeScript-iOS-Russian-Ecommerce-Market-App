module.exports = {
  preset: '@react-native/jest-preset',
  // Detox e2e tests run under their own runner (e2e/jest.config.js), not here.
  testPathIgnorePatterns: ['/node_modules/', '/e2e/'],
};
