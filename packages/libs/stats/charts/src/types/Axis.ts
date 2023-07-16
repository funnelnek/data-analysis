import { Scale } from "./Scale";

export type AxisOptions = {    
    label: string;
    feature: string;
    scale: Scale;
}


export type Axis = {
    x: AxisOptions;
    y: AxisOptions;
    z?: AxisOptions
};