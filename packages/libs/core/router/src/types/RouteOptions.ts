import { Router } from "../Router";
import { RouteConfig } from "../contracts/RouteConfig";
import { Type } from "@funnelnek/ioc";

export type RouteOptions = Partial<RouteConfig> | Type<Router>;