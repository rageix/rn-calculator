// eslint-disable-next-line no-undef
module.exports = {
  preset: '@testing-library/react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  setupFilesAfterEnv: ['./jest-setup.ts'],
  testMatch: ["<rootDir>/**/*.tests.(ts|tsx|js)"],
};