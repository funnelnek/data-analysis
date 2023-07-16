import { BehaviorSubject, Observable, Subject } from "rxjs";
import { RouteIncomingRequest, Routing } from "./contracts";
import { RouteInterceptor } from "./contracts/RouteInterceptor";
import { InterceptorObserver } from "./InterceptorObserver";
import { RouteMiddleware } from "./RouteMiddleware";


export class InterceptorMiddleware extends RouteMiddleware {
    constructor(route: Routing, protected interceptors: RouteInterceptor[]) {
        super(route);
    }

    protected handle(request: Observable<RouteIncomingRequest>): Observable<RouteIncomingRequest> {                
        let { stream, latestResponse, interceptors } = this;
        let requests = new Subject<RouteIncomingRequest>();
        let reset = new Subject<void>();
        let observer = new InterceptorObserver(requests, interceptors, stream, latestResponse, reset);
        let { unsubscribe } = request.subscribe(observer);

        reset.subscribe(() => (this.stream = new Subject()));        
        requests.subscribe({ next: (_) => {
            this.stream = new Subject<any>();
            this.latestResponse = new BehaviorSubject<Observable<any>>(this.stream.asObservable());
        }, complete: unsubscribe });
        return requests.asObservable();
    }
}
