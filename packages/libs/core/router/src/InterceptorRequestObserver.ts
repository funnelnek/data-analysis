import { AsyncSubject, Observer, Subject } from "rxjs";
import { RouteIncomingRequest } from "./contracts";
import { isRouteRequest } from "./utils";

export class InterceptorRequestObserver implements Observer<any> {
    protected interrupted: boolean = false;

    constructor(
        protected notifier: AsyncSubject<RouteIncomingRequest>,
        protected stream: Subject<any>
    ) {    
    }

    next(request: any): void {
        const { notifier : notify } = this;

        if (isRouteRequest(request)) {
            return notify.next(request);
        }

        this.interrupted = true;

        notify.next(request);
        notify.complete();
    }

    error(exception: any): void {
        this.notifier.error(exception);
    }

    complete(): void {
        if (!this.interrupted) {
            this.notifier.complete();
        }
    }
}