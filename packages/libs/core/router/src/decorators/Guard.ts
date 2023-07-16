import { Routing } from "../contracts";
import { RouteDecorator } from "../types/RouteDecorator";
import { GuardOptions } from "../types/GuardOptions";
import { RouteFetcher } from "../types/RouteFetcher";


export const Guard = (options?: GuardOptions): RouteDecorator => {
    return (proto: Routing, fetcher: "loader" | "action", _: TypedPropertyDescriptor<RouteFetcher>): void => {
        let route = proto.constructor;
        
        options = options !== undefined ? options : true;

        Reflect.defineMetadata(`route:guard`, options, route, fetcher);
        Reflect.defineMetadata(`route:guard:${fetcher}`, options, route);
    }
}