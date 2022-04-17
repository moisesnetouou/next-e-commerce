module.exports = {
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  bail: 1,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['components/**/*.js', 'pages/**/*.js'],
  coverageReporters: ['lcov', 'text'],

  // // An array of file extensions your modules use
  // moduleFileExtensions: [
  //   "web.js",
  //   "js",
  //   "web.ts",
  //   "ts",
  //   "web.tsx",
  //   "tsx",
  //   "json",
  //   "web.jsx",
  //   "jsx",
  //   "node"
  // ],
  // moduleNameMapper: {
  //   '^.+\\.(css|sass|scss)$': 'identity-obj-proxy',
  // },
  // resetMocks: true,
  setupFiles: [
    "react-app-polyfill/jsdom"
  ],

  // // A list of paths to modules that run some code to configure or set up the testing framework before each test
  // setupFilesAfterEnv: [
  //   "<rootDir>/config/jest/setupTests.ts"
  // ],

  // testMatch: [
  //   "**/__tests__/**/?(*.)+(spec|test).[tj]s?(x)",
  // ],

  // transform: {
  //   "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": "<rootDir>/config/jest/transforms/babelTransform.ts",
  //   "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)": "<rootDir>/config/jest/transforms/fileTransform.ts"
  // },
};
