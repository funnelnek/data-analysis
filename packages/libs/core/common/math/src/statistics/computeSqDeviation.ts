/**
 * A curry function for computing square deviation based on the mean.
 * 
 * @example
 *
 * ```ts
 * var deviation = computeSqDeviation(5)
 * var squareDeviation = deviation(12)
 * ```
 * 
 * @since 1.0.0
 * 
 * 
 * @param mean - The mean
 * @returns {Function} A function that takes x and compute the square deviation based on the mean.
 */
export function computeSqDeviation(mean: number): (x: number) => number {
    return (x: number) => (x - mean) ** 2;
}