import { jest } from '@jest/globals';

jest.unstable_mockModule('@funnelnek/collection', () => jest.fn());

const { mode } = await import('./mode');

describe('mode', () => {
    it('should detect the mode from a series of numbers', () =>{
        expect(mode([35, 40, 45, 49, 34, 47, 39, 25, 19, 35, 28, 48])).toEqual(['35']);
    });
});