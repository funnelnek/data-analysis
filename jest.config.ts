import type { JestConfigWithTsJest } from 'ts-jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';


const config: JestConfigWithTsJest = {
  coverageDirectory: "test/coverage",
  cacheDirectory: "test/cache",
  preset: 'ts-jest/presets/default-esm',
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
    "<rootDir>/lib/"
  ]
};

export default config;