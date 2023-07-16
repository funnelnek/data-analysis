import { isAsync } from "@funnelnek/common";
import { BehaviorSubject, isObservable, Observable, ReplaySubject, Subject, switchMap } from "rxjs";
import { FetcherProxy, Routing } from "./contracts";
import { RouteFetcher, RouteProxyRequest } from "./types";
import { RouteIncomingRequest } from "./contracts/RouteIncomingRequest";


export abstract class RouteMiddleware implements FetcherProxy {
    protected stream: Subject<any> = new Subject<any>();
    protected incoming: Subject<RouteIncomingRequest> = new Subject<RouteIncomingRequest>();
    protected latestResponse: BehaviorSubject<Observable<any>> = new BehaviorSubject<Observable<any>>(this.stream.asObservable())
    protected response: Observable<any>;
    
    protected constructor(protected route: Routing) {
        let { handle, fetch, exception, stream, incoming, latestResponse } = this;
        
        let replayLatestResponse = new ReplaySubject<any>(1);

        latestResponse.pipe(switchMap(x => x)).subscribe(replayLatestResponse);
        
        this.response = replayLatestResponse.asObservable();

        incoming.pipe(handle, fetch, exception).subscribe(stream);
    }

    apply(fetcher: RouteFetcher, context: Routing, [message]: RouteProxyRequest): any {
        let { incoming, response } = this;
        let request = { incoming: message, fetcher, context };

        incoming.next(request);
        return response;
    }

    protected abstract handle(request: Observable<RouteIncomingRequest>): Observable<RouteIncomingRequest>;

    protected exception(stream: Observable<any>): Observable<any> {
        let pipe = new Subject<any>();

        stream.subscribe({
            next(value) {
                pipe.next(value);
            },
            error(err) {
                pipe.next(err);
            },
            complete() {
                pipe.complete();
            },
        });

        return pipe.asObservable();
    }

    protected fetch(request: Observable<RouteIncomingRequest>): Observable<any> {
        let response = new Subject<any>();
        let subscription = request.subscribe({
            next: ({incoming: req, fetcher, context}) => {
                if (fetcher) {
                    let data = Reflect.apply(fetcher, context, [req]);
        
                    if (!isAsync(data)) {
                        return response.next(data);
                    }
        
                    if (isObservable(data)) {
                        return data.subscribe(response);
                    }
        
                    if (data instanceof Promise) {
                        data.then(response.next);
                    }
                }
            },
            error(err) {
                response.error(err);
            },
            complete() {
                subscription.unsubscribe();
                response.complete();
            },
        });
        return response.asObservable();
    }

    protected onResponse(data: Observable<any>): Observable<any> {
        let { stream, response } = this;

        data.subscribe({
            next(value) {
                stream.next(value);
            },
            error(err) {
                stream.error(err);
            },
            complete() {
                stream.complete();
            },
        });

        return response;
    } 
}