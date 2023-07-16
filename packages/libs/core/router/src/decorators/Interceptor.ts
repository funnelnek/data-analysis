import { Routing } from "../contracts";
import { InterceptorMiddleware } from "../InterceptorMiddleware";
import { RouteDecorator, RouteFetcher } from "../types"

export const Interceptor = (...interceptors: InterceptorMiddleware[]): RouteDecorator => {
    return (proto: Routing, fetcher: "loader" | "action", _: TypedPropertyDescriptor<RouteFetcher>): void => {
        let route = proto.constructor;
        Reflect.defineMetadata(`route:interceptor`, interceptors, route, fetcher);
        Reflect.defineMetadata(`route:interceptor:${fetcher}`, interceptors, route);
    }
}