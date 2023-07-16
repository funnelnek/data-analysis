import { Observable } from "rxjs";
import { Guardian, Routing, RouteIncomingRequest } from "./contracts";
import { RouteMiddleware } from "./RouteMiddleware";
import { GuardOptions } from "./types";
export declare class RouteGuard extends RouteMiddleware {
    protected route: Routing;
    protected config: GuardOptions;
    protected guards: Guardian[];
    protected deactivateGuards: Guardian[];
    protected canLoadGuards: Guardian[];
    constructor(route: Routing, config: GuardOptions);
    protected handle(request: Observable<RouteIncomingRequest>): Observable<RouteIncomingRequest>;
}
