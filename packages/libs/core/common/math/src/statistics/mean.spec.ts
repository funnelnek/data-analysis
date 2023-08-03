import { mean } from './mean';
import { InvalidArgumentError } from '@funnelnek/exceptions';

// Calculating the expected results.
let data = [35, 40, 45, 49, 34, 47, 39, 25, 19, 35, 28, 48];
let avg = data.reduce((a, b) => a + b) / data.length;
let invalid: unknown[] = [
    [],
    '0',
    undefined
];


describe('mean', () => {
    it("should throw InvalidArgumentError if series is an invalid data type", () => {    
        invalid.forEach((x) => {
            expect(() => mean(x as number[])).toThrow(InvalidArgumentError);
        });
    });

    it("should calculate the mean from an array of numbers", () => {
        expect(mean(data)).toBe(avg);
    });
});