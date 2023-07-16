import { Type } from "@funnelnek/ioc";
import { Guardian } from "../contracts";
import { RoutingGuard } from "./RoutingGuard";
export type GuardType = RoutingGuard | Type<Guardian>;
