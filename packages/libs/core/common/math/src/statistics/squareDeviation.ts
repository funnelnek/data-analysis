import { computeSqDeviation } from "./computeSqDeviation";
import { mean as mu } from "./mean";


/**
 * Calculates the square deviation.
 * 
 * @since 1.0.0
 * 
 * 
 * @param {number[]} series - A series of numbers.
 * @returns {number} The square deviation.
 */
export function squareDeviation(series: number[]): number {
    let mean = mu(series);
    let deviation = computeSqDeviation(mean);

    return series.reduce((sum, x) => sum + deviation(x), 0);
}