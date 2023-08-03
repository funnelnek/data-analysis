import { jest } from '@jest/globals';   

jest.unstable_mockModule('@funnelnek/collection', () => ({
    asc: jest.fn((a: number, b: number) => a - b)
}));

const { median } = await import('./median');

describe('median', () => {
    it("should return the median from a series of numbers", () => {
        // [19, 25, 28, 34, 35, 35, 39, 40, 45, 47, 48, 49]
        expect(median([35, 40, 45, 49, 34, 47, 39, 25, 19, 35, 28, 48])).toBe(37);
        // [19, 25, 28, 34, 35, 35, 39, 40, 45, 47, 48]
        expect(median([35, 40, 45, 34, 47, 39, 25, 19, 35, 28, 48])).toBe(35);
    });
})