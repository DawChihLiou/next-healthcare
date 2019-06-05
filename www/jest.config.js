module.exports = {
  testPathIgnorePatterns: [
    '<rootDir>/www/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/www/node_modules/',
    '<rootDir>/api/node_modules/',
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.svg$': 'jest-svg-transformer',
  },
};
