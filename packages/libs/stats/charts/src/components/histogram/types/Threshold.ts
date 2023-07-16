import { ThresholdCountGenerator, ThresholdNumberArrayGenerator } from "d3";

export type Threshold<Value extends number = number> = ArrayLike<Value> | ThresholdNumberArrayGenerator<Value> | number;