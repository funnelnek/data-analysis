import { HttpResponseBase } from "@funnelnek/http";
import { Observable } from "rxjs";
import { RouteIncomingSnapshot, RouteIncomingRequest, Routing, PipeTransform } from "./contracts";
import { RouteMiddleware } from "./RouteMiddleware";
import { PipeTransformFn } from "./types";

export class RoutePipe extends RouteMiddleware {
    
    constructor(route: Routing, protected pipes: (PipeTransform | PipeTransformFn)[]) {
        super(route);
    }

    protected handle(request: Observable<RouteIncomingRequest>): Observable<RouteIncomingRequest> {
        throw new Error("Method not implemented.");
    }

    protected pre(request: Observable<RouteIncomingSnapshot>): Observable<RouteIncomingRequest> {
        throw new Error("Method not implemented.");
    }

    protected post(request: Observable<HttpResponseBase>): Observable<HttpResponseBase> {
        throw new Error("Method not implemented.");
    }
}