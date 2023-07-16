import { max, min, bin, Bin, ScaleLinear, scaleLinear, ValueFn } from 'd3';
import { IHistogram } from "./contracts";
import { HistogramOptions } from './types';
import { Chart } from '../../Chart';


export class Histogram<T = number> extends Chart<T> implements IHistogram<T> {
    _bins: Bin<number, number>[];
    _y: ScaleLinear<number, number, number>;
    _x: ScaleLinear<number, number, number>;
  
    constructor(options: HistogramOptions<T>) {
        super(options);

        let ticks: number[] = [];
        let { source, axes: { x, y } } = this;
        let { threshold, value = extract, domain } = options;
        let _x = scaleLinear(x.scale.domain, x.scale.range);
        let _y = scaleLinear(y.scale.domain, y.scale.range);
        let histogram = bin();      

        if (x.scale.ticks) {
           ticks = _x.ticks(x.scale.ticks)
        }

        if (y.scale.ticks) {
            _y.ticks(y.scale.ticks)
        }

        if (!threshold) {
            threshold = ticks;
        }
        
        if (!domain) {
            if (x.scale.domain) {
                domain = x.scale.domain;
            } else {
                let minimum: number = min(source.data, extract) as number;
                let maximum: number = max(source.data, extract) as number;
    
                domain = [minimum, maximum];               
            }
        }

        //histogram.value(value);
        histogram.domain(domain);
        
        //threshold setting
        if (typeof threshold === 'number') {
            histogram.thresholds(threshold);
        } else if(typeof threshold === 'function') {
            histogram.thresholds(threshold);
        } else {
            histogram.thresholds(threshold);
        }

        this._x = _x;
        this._y = _y;
        this._bins = histogram(source.data as ArrayLike<number>);


        function extract(d: T): number {
            if (typeof d === 'number') {
                return d;
            }

            return (d as {[k:string]: number })[x.feature];
        }
    }


    x(i: number) {
        return this._x(i);
    }

    y(i: number) {
        return this._y(i);
    }
}