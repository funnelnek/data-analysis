import { Domain } from "./Domain";
import { ScaleType } from "./ScaleType";

export type Scale = {
    type: ScaleType,
    domain: Domain;
    range: Iterable<any>;
    ticks?: number;
    tickFormat?: string;
}