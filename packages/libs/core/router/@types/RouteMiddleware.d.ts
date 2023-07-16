import { BehaviorSubject, Observable, Subject } from "rxjs";
import { FetcherProxy, Routing } from "./contracts";
import { RouteFetcher, RouteProxyRequest } from "./types";
import { RouteIncomingRequest } from "./contracts/RouteIncomingRequest";
export declare abstract class RouteMiddleware implements FetcherProxy {
    protected route: Routing;
    protected stream: Subject<any>;
    protected incoming: Subject<RouteIncomingRequest>;
    protected latestResponse: BehaviorSubject<Observable<any>>;
    protected response: Observable<any>;
    protected constructor(route: Routing);
    apply(fetcher: RouteFetcher, context: Routing, [message]: RouteProxyRequest): any;
    protected abstract handle(request: Observable<RouteIncomingRequest>): Observable<RouteIncomingRequest>;
    protected exception(stream: Observable<any>): Observable<any>;
    protected fetch(request: Observable<RouteIncomingRequest>): Observable<any>;
    protected onResponse(data: Observable<any>): Observable<any>;
}
