import { InterceptorMiddleware } from "../InterceptorMiddleware";
import { RouteDecorator } from "../types";
export declare const Interceptor: (...interceptors: InterceptorMiddleware[]) => RouteDecorator;
