import { jest } from '@jest/globals';

jest.unstable_mockModule('./squareDeviation', () => ({
    squareDeviation: jest.fn(() => 1008)
}))

const { variance } = await import('./variance');

describe('variance', () => {
    it('should calculate the variance', () => {
        expect(variance([35, 40, 45, 49, 34, 47, 39, 25, 19, 35, 28, 48])).toBe(84);
        expect(variance([35, 40, 45, 49, 34, 47, 39, 25, 19, 35, 28, 48], 1)).toBe(91.63636363636364);
        expect(variance([35, 40, 45, 49, 34, 47, 39, 25, 19, 35, 28, 48], 2)).toBe(100.8);
    });
});