module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/application/usecases/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['text-summary', 'lcov'],
  roots: [
    '<rootDir>'
  ],
  moduleNameMapper: {
    '@application/(.*)': '<rootDir>/src/application/$1',
    '@core/(.*)': '<rootDir>/src/core/$1',
    '@domain/(.*)': '<rootDir>/src/domain/$1',
    '@infra/(.*)': '<rootDir>/src/infra/$1',
    '@main/(.*)': '<rootDir>/src/main/$1',
    '@tests/(.*)': '<rootDir>/tests/$1'
  },
  coveragePathIgnorePatterns: [
    'index.js',
    'index.jsx',
    'index.ts'
  ],
  modulePathIgnorePatterns: ['<rootDir>/pgdata'],
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest']
  }
}
