import { MissingArgumentError, InvalidArgumentError } from '@funnelnek/exceptions';


/**
 * Calculates the summation from a series of numbers.
 * 
 * @example
 *
 * ```ts
 * sum([1, 3, 5, 7, 9]) // 25
 * 
 * ```
 * 
 * @since 1.0.0
 * 
 * @param {number[]} series - A series of numbers.
 * @returns {number} - The summation of adding all the numbers.
 * 
 * @throws {Error} - Throws an error if the series is `undefined` or an invalid data type.
 * @overload
 */
export function sum(series: number[]): number;
/**
 * Calculates the summation from a series of numbers.
 * 
 * @example
 *
 * ```ts
 *  sum(1, 3, 5, 7, 9) // 25
 * ```
 * 
 * @since 1.0.0
 * 
 * @param {number[]} series - A series of numbers.
 * @returns {number} - The summation of adding all the numbers.
 * 
 * @overload
 */
export function sum(...series: number[]): number;
/**
 * Calculates the summation from a series of numbers. 
 * 
 * @since 1.0.0
 * 
 * @param {number[]} series - A series of numbers. 
 * @returns {number} - The summation of adding all the numbers.
 */
export function sum(...series: number[] | [number[]]): number {
    if (arguments.length < 1) {
        throw new MissingArgumentError('series');
    } 

    if (arguments.length == 1 && !Array.isArray(series[0])) { 
        throw new InvalidArgumentError("Must provide an array of numbers.");
    } 
    
    if (arguments.length == 1, Array.isArray(series[0])) {        
        if (series[0].length === 0 || !series[0].every((n) => typeof n === 'number')) {
            throw new InvalidArgumentError("Must provide an array of numbers. Received empty array");
        }

        return (series[0] as number[]).reduce((a, x) => a + x, 0);
    }
    
    let nums = Array.from(series as ArrayLike<number>);

    if (!nums.every(n => typeof n === 'number')) {
        throw new InvalidArgumentError("Must provide an array of numbers. Received empty array");
    }

    return nums.reduce((a, x) => (a + x), 0)
}