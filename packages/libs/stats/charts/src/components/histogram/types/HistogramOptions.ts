import { Domain } from "../../../types";
import { ChartOptions } from "../../../types/ChartOptions";
import { Threshold } from ".";


export type HistogramOptions<DataSource = number> = {
    threshold?: Threshold;
    domain?: Domain;
    value?: (d: DataSource, i: number, data: ArrayLike<number>) => number;
} & ChartOptions<DataSource>;