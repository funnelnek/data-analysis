import { jest } from '@jest/globals';
import { mean } from './mean';
import { InvalidArgumentError, MissingArgumentError } from '@funnelnek/exceptions';

let mockSum = jest.fn(() => 45);

jest.mock('../arithmetic/sum', () => ({
    __esModule: true,
    sum: mockSum
}));

describe('mean', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should throw InvalidArgumentError if series is an invalid data type", () => {        
        expect(() => mean([])).toThrow(InvalidArgumentError);
        expect(() => mean('0' as unknown as number[])).toThrow(InvalidArgumentError);
        expect(() => mean(undefined!)).toThrow(InvalidArgumentError);
    });

    it("should calculate the mean from an array of numbers", () => {
        expect(mean([1,2,3,4,5,6,7,8,9])).toBe(5);
    });
});