import { HttpResponseBase } from "@funnelnek/http";
import { Observable } from "rxjs";
import { RouteIncomingSnapshot, RouteIncomingRequest, Routing, PipeTransform } from "./contracts";
import { RouteMiddleware } from "./RouteMiddleware";
import { PipeTransformFn } from "./types";
export declare class RoutePipe extends RouteMiddleware {
    protected pipes: (PipeTransform | PipeTransformFn)[];
    constructor(route: Routing, pipes: (PipeTransform | PipeTransformFn)[]);
    protected handle(request: Observable<RouteIncomingRequest>): Observable<RouteIncomingRequest>;
    protected pre(request: Observable<RouteIncomingSnapshot>): Observable<RouteIncomingRequest>;
    protected post(request: Observable<HttpResponseBase>): Observable<HttpResponseBase>;
}
