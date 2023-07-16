import { IChart, IMargin } from "./contracts";
import { Axis, DataSource } from "./types";
import { ChartOptions } from "./types/ChartOptions";


export abstract class Chart<T = number> implements IChart<T> {
    _width: number;
    _height: number;
    _source: DataSource<T>;
    _axes: Axis;
    _margin?: IMargin = undefined;
    _name?: string | undefined;
    _x: any;
    _y: any;
   
    constructor(options: ChartOptions<T>) {
        const { width, height, source, name, margin, axes } = options;
        
        this._width = width;
        this._height = height;
        this._source = source;
        this._name = name;
        this._margin = margin;
        this._axes = axes;
    }   

    get width(): number {
        if (this.margin) {
            let left = this.margin.left ?? 0;
            let right = this.margin.right ?? 0;
            return this._width - right - left;
        }

        return this._width;        
    }

    get height(): number {
        if (this.margin) {
            let left = this.margin.top ?? 0;
            let right = this.margin.bottom ?? 0;
            return this._height - right - left;
        }

        return this._height;
    }

    get data(): T[] {
        return this._source.data;
    }

    get name(): string | undefined {
        return this._name
    }

    get margin(): IMargin | undefined {
        return this._margin;
    }

    get source(): DataSource<T> {
        return this._source;        
    }

    get axes(): Axis {
        return this._axes;
    }

    abstract x(value: any): any;
    abstract y(value: any): any;
}