import type { JestConfigWithTsJest } from 'ts-jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';


const config: JestConfigWithTsJest = {
  verbose: false,
  preset: 'ts-jest/presets/default-esm',
  coverageDirectory: "test/coverage",
  collectCoverage: true,
  cacheDirectory: "test/cache",
  extensionsToTreatAsEsm: ['ts', 'tsx', 'jsx'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" }),
  transform: {
    '^.+\\.tsx?$': ["ts-jest", { tsconfig: "tsconfig.spec.json" , useESM: true }]
  },
  snapshotSerializers: [
    '@emotion/jest/serializer' /* if needed other snapshotSerializers should go here */
  ]
};

export default config;