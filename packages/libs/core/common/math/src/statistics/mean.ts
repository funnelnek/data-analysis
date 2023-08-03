import { sum } from "../arithmetic";


/**
 * Calculate the mean/average from a series of numbers.
 * 
 * @remarks
 * In statistics, Arithmetic Mean is the average of all data values which you work with. 
 * Mean is used to find the average value around which your data values range.
 * 
 * To find the mean, all you have to do is add up all the values in your data and then divide it by the total number of data values. 
 * 
 * 
 * @example
 * ```ts
 * mean([1,3,5,7,9]) // 5
 * ```
 * 
 * @since 1.0.0
 * 
 * @param {number[]} series - The series of numbers.
 * @returns {number} The calculated mean/average.
 */
export function mean(series: number[]): number {
    return sum(series) / series.length;
}