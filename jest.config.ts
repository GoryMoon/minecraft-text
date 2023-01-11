import { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    extensionsToTreatAsEsm: ['.ts']
};

export default config;