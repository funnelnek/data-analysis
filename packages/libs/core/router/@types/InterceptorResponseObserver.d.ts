import { Observable, Observer, Subject } from "rxjs";
import { RouteIncomingRequest } from "./contracts";
export declare class InterceptorResponseObserver implements Observer<any> {
    protected response: Observable<any>;
    protected notifier: Subject<RouteIncomingRequest>;
    constructor(response: Observable<any>, notifier: Subject<RouteIncomingRequest>);
    next(response: any): void;
    error(exception: any): void;
    complete(): void;
}
