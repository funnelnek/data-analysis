import { MissingArgumentError, InvalidArgumentError } from '@funnelnek/exceptions';
import { sum } from './sum';


describe("sum", () => {
    it("should throw MissingArgumentError if no agrument is provided", () => {
        expect(() => sum()).toThrow(MissingArgumentError);
    });

    it("should throw InvalidArgumentError if series is an invalid data type", () => {
        expect(() => sum(0)).toThrow(InvalidArgumentError);
        expect(() => sum([])).toThrow(InvalidArgumentError);
        expect(() => sum('0' as unknown as number)).toThrow(InvalidArgumentError);
    });

    it("should sum all numbers from an array of numbers", () => {
        expect(sum([1,2,3,4,5,6,7,8,9])).toBe(45);
    });
    
    it("should sum all numbers from an array of numbers arguments", () => {
        expect(sum(1,2,3,4,5,6,7,8,9)).toBe(45);
    });
});