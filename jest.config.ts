import type { JestConfigWithTsJest } from 'ts-jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';


const config: JestConfigWithTsJest = {
  coverageDirectory: "test/coverage",
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.spec.{ts,tsx}',
    '!**/*.d.ts',
    '!**/lib/**',
    '!**/dist/**',
    '!**/contracts/**',
    '!**/types/**',
    '!**/@types/**',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  cacheDirectory: "test/cache",
  preset: 'ts-jest/presets/js-with-babel-esm',
  extensionsToTreatAsEsm: ['.ts', '.tsx', '.jsx', '.mts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "./packages" }),
  transform: {
    '^.+\\.tsx?$': ["ts-jest", { tsconfig: "tsconfig.spec.json", useESM: true }]
  },
  snapshotSerializers: [
    '@emotion/jest/serializer' /* if needed other snapshotSerializers should go here */
  ],
  testPathIgnorePatterns: [
    "<rootDir>/build/", 
    "<rootDir>/node_modules/",
    "<rootDir>/dist/",
    "/^.+/(lib|dist)/"
  ]
};

export default config;