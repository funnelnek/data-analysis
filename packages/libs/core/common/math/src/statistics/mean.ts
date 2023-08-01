import { sum } from "../arithmetic";

/**
 * Calculate the mean/average from a series of numbers.
 * 
 * @example
 *
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