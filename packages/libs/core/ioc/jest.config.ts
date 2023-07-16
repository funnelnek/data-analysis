import type { JestConfigWithTsJest } from 'ts-jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from '../../../tsconfig.json';


const config: JestConfigWithTsJest = {
  verbose: false,
  coverageDirectory: "test/coverage",
  collectCoverage: true,
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts"
  ],
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  cacheDirectory: "test/cache",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "./packages" }),
  transform: {
    '^.+\\.tsx?$': ["ts-jest", { tsconfig: "tsconfig.spec.json", useESM: true }]
  },
  testMatch: [
    "<rootDir>/test/**/*.spec.ts",
    "<rootDir>/test/**/*.spec.tsx"
  ]
};

export default config;