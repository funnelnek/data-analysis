import { asc } from '@funnelnek/collection';

/**
 * Finds the median of an array of numerical values.
 * 
 * @remarks
 * The median is the middle value in a set of data. First, organize and order the data from smallest to largest. 
 * To find the midpoint value, divide the number of observations by two. 
 * If there are an odd number of observations, round that number up, and the value in that position is the median.
 * 
 * 
 * @since 1.0.0 
 * 
 * @param series - The array of numerical values.
 * @returns {number} The median value.
 */
export function median(series: number[]): number {
    if (series.length === 0) return 0;

    let n = series.length;
    let midpoint = n / 2;
    let data = [...series].sort(asc);

    if (n % 2 === 0) {
        return (data[midpoint - 1] + data[midpoint]) / 2;
    } else {
        return data[Math.floor(midpoint)];
    }
}