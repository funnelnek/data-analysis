import { Axis } from "../types";
import { IDataSource } from "./IDataSource";
import { IMargin } from "./IMargin";


export interface IChart<T = number> {
    width: number;
    height: number;
    source: IDataSource<T>;
    axes: Axis;
    name?: string;
    margin?: IMargin;
    x(value: any): any;
    y(value: any): any;
}