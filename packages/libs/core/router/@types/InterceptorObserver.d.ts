import { BehaviorSubject, Observable, Observer, Subject } from "rxjs";
import { RouteIncomingRequest } from "./contracts";
import { RouteInterceptor } from "./contracts/RouteInterceptor";
export declare class InterceptorObserver implements Observer<RouteIncomingRequest> {
    protected requests: Subject<RouteIncomingRequest>;
    protected interceptors: RouteInterceptor[];
    protected stream: Subject<any>;
    protected latestResponse: BehaviorSubject<Observable<any>>;
    protected reset: Subject<void>;
    constructor(requests: Subject<RouteIncomingRequest>, interceptors: RouteInterceptor[], stream: Subject<any>, latestResponse: BehaviorSubject<Observable<any>>, reset: Subject<void>);
    next(request: RouteIncomingRequest): void;
    error(err: any): void;
    complete(): void;
}
