import { BehaviorSubject, Observable, Observer, Subject } from "rxjs";
import { RouteIncomingRequest } from "./contracts";
import { InterceptorHandler } from "./contracts/InterceptorHandler";
import { RouteInterceptor } from "./contracts/RouteInterceptor";
export declare class InterceptionObserver implements Observer<RouteInterceptor> {
    protected notifier: Subject<any>;
    protected responses: BehaviorSubject<Observable<any>>;
    protected request: RouteIncomingRequest;
    protected response: Observable<any>;
    constructor(notifier: Subject<any>, responses: BehaviorSubject<Observable<any>>);
    next({ intercept }: RouteInterceptor): void;
    error(exception: any): void;
    complete(): void;
    protected get handler(): InterceptorHandler;
}
