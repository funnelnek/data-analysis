import { Observer, Subject } from "rxjs";
import { RouteIncomingRequest } from "./contracts";
export declare class PostInterceptorObserver implements Observer<any> {
    protected requests: Subject<RouteIncomingRequest>;
    protected stream: Subject<any>;
    protected notify: Subject<any>;
    constructor(requests: Subject<RouteIncomingRequest>, stream: Subject<any>, notify: Subject<any>);
    next(value: any): void;
    error(err: any): void;
    complete(): void;
}
