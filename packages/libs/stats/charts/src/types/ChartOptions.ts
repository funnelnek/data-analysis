import { IMargin } from "../contracts";
import { Axis } from "./Axis";
import { DataSource } from "./DataSource";


export type ChartOptions<T = number> = {
    axes: Axis;
    width: number;
    height: number;
    source: DataSource<T>
    name?: string;
    margin?: IMargin;
}