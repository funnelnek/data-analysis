import { squareDeviation } from './squareDeviation';


/**
 * Calculates the variance.
 * 
 * @remarks
 * The variance calculates the spread/dispersion of the data from the mean/average.
 * 
 * @since 1.0.0
 * 
 * @param {number[]} series - A series of numbers.
 * @param {number} ddof - The degree of freedom for the standard deviation.
 * @returns {number} The calculated variance.
 */
export function variance(series: number[], ddof: number = 0): number {
    let n = series.length;
    let sum = squareDeviation(series);
    
    return sum / (n - ddof);
}