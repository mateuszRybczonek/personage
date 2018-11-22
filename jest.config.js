module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue',
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.svg$': '<rootDir>/__jest__/transformSvg.js',
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  snapshotSerializers: [
    'jest-serializer-vue',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!vue-lottie)',
  ],
  setupFiles: [
    'jest-context/setup',
  ],
  globals: {
    'vue-jest': {
      experimentalCSSCompile: false,
    },
  },
};
