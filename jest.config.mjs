export default {
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  extensionsToTreatAsEsm: ['.ts'],
  testEnvironment: 'node',
};
