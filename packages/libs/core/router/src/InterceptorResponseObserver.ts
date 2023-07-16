import { Observable, Observer, Subject } from "rxjs";
import { RouteIncomingRequest } from "./contracts";

export class InterceptorResponseObserver implements Observer<any> {
    constructor(
        protected response: Observable<any>,
        protected notifier: Subject<RouteIncomingRequest>
    ) {
    
    }

    next(response: any): void {

    }

    error(exception: any): void {

    }

    complete(): void {

    }

}