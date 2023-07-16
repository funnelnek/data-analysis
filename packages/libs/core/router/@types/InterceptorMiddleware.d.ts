import { Observable } from "rxjs";
import { RouteIncomingRequest, Routing } from "./contracts";
import { RouteInterceptor } from "./contracts/RouteInterceptor";
import { RouteMiddleware } from "./RouteMiddleware";
export declare class InterceptorMiddleware extends RouteMiddleware {
    protected interceptors: RouteInterceptor[];
    constructor(route: Routing, interceptors: RouteInterceptor[]);
    protected handle(request: Observable<RouteIncomingRequest>): Observable<RouteIncomingRequest>;
}
