export const roots = ['<rootDir>/src', '<rootDir>/tests'];
export const collectCoverageFrom = [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/index.{ts,tsx}',
    '!<rootDir>/src/components/common/*.{ts,tsx}',
    '!<rootDir>/src/*.{ts,tsx}',
];
export const coverageDirectory = 'coverage';
export const setupFilesAfterEnv = ['<rootDir>/tests/unit/setup.ts'];
export const testPathIgnorePatterns = [
    '<rootDir>/node_modules/',
    '<rootDir>/tests/e2e/cypress'
];
export const testEnvironment = 'jsdom';
export const transform = {
    '.+\\.(ts|tsx)$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
};
export const moduleNameMapper = {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/scripts/testMock.js'
};
export const coverageThreshold = {
    "global": {
        "branches": 70,
        "functions": 80,
        "lines": 80,
        "statements": 80
    }
};
export const watchPathIgnorePatterns = ['index'];
  