import { LazyRouteFunction, RouteObject } from "react-router";
import { RouteFetcher } from "./RouteFetcher";
export type RoutePipeFn = RouteFetcher | LazyRouteFunction<RouteObject>;
