import { jest } from '@jest/globals';

let x = [4, 9, 64, 144, 9, 100, 4, 144, 324, 4, 81, 121];
let i = 0;
let sum = 1008;

jest.unstable_mockModule('./computeSqDeviation', () => ({
    computeSqDeviation: jest.fn(() => () => {
        let value =  x[i];
        
        i++;
        return value;
    })
}));

jest.unstable_mockModule('./mean', () => ({
    mean: jest.fn()
}));

const { squareDeviation } = await import('./squareDeviation');

describe('squareDeviation', () => {
    it('should calculate the square deviation', () => {
        expect(squareDeviation([35, 40, 45, 49, 34, 47, 39, 25, 19, 35, 28, 48])).toBe(sum);
    });
});