import { PipeTransform, Routing } from "../contracts"
import { PipeTransformFn, RouteDecorator, RoutePipeFn } from "../types"


export const Pipe = (...pipes: (PipeTransform | PipeTransformFn)[]): RouteDecorator => {
    return (proto: Routing, fetcher: "loader" | "action" | "lazy", _: TypedPropertyDescriptor<RoutePipeFn>): void => {
        let route = proto.constructor;
        Reflect.defineMetadata(`route:pipe`, pipes, route, fetcher);      
        Reflect.defineMetadata(`route:pipe:${fetcher}`, pipes, route);
    }
}