import { PipeTransform } from "../contracts";
import { PipeTransformFn, RouteDecorator } from "../types";
export declare const Pipe: (...pipes: (PipeTransform | PipeTransformFn)[]) => RouteDecorator;
