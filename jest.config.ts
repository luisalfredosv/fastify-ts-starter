import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  transform: {
    '^.+\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },

  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/index.ts',
    '!src/config/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    'text',
    'lcov',
    'json-summary',
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 80,
      lines: 100,
      statements: 100,
    },
  },
  rootDir: '.',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};

export default config;
