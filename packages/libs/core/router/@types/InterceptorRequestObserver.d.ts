import { AsyncSubject, Observer, Subject } from "rxjs";
import { RouteIncomingRequest } from "./contracts";
export declare class InterceptorRequestObserver implements Observer<any> {
    protected notifier: AsyncSubject<RouteIncomingRequest>;
    protected stream: Subject<any>;
    protected interrupted: boolean;
    constructor(notifier: AsyncSubject<RouteIncomingRequest>, stream: Subject<any>);
    next(request: any): void;
    error(exception: any): void;
    complete(): void;
}
