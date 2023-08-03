import { Enumerable } from '@funnelnek/collection';

/**
 * 
 * @param series 
 * @returns 
 */
export function mode(series: (number|string)[]): (number|string)[] { 
  let frequencies = series.reduce((count, e) => {
    if (!(e in count)) {
      count[e] = 1;
    }
    
    count[e] += 1;
    return count;
  }, {} as Enumerable<number>);

  let modes: (number|string)[] = [];
  let max = 0;
  let n = Object.keys(frequencies).length;

  for (let [k, v] of Object.entries(frequencies)) {
    if (v > max) {
      modes = [k];
      max = v;
    } else if (v === max) {
      modes.push(k);
    }
  }  
  
  if (modes.length === n) modes = [];

  return modes;
};