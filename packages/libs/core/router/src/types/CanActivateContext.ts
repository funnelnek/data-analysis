import { HttpResponseBase } from "@funnelnek/http";
import { RouteIncomingSnapshot } from "../contracts";

export type CanActivateContext = RouteIncomingSnapshot | HttpResponseBase;