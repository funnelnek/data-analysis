import { LazyRouteFunction, RouteObject } from "react-router";
import { Routing } from "./contracts";
import { LazyRouteProxy } from "./LazyRouteProxy";
export declare class RouteLazyLoader implements ProxyHandler<LazyRouteFunction<RouteObject>> {
    protected proxy: LazyRouteProxy;
    protected initialized: boolean;
    constructor(proxy: LazyRouteProxy);
    apply(target: LazyRouteFunction<RouteObject>, route: Routing, args: []): Promise<Omit<RouteObject, import("@remix-run/router/dist/utils").ImmutableRouteKey>> | undefined;
}
