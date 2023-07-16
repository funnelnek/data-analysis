import { Routing } from "../contracts";
import { RouteFetcher } from "./RouteFetcher";
export type RouteDecorator = (prototype: Routing, fetcher: "loader" | "action", decriptor: TypedPropertyDescriptor<RouteFetcher>) => void;
