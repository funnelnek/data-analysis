import { Routing } from "../contracts";
import { Type } from "@funnelnek/ioc";
import { RouteOptions } from "../types/RouteOptions";
export declare const Route: (options?: RouteOptions) => (route: Type<Routing>) => void;
