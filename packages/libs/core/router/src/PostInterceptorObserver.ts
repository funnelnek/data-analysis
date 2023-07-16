import { Observer, Subject } from "rxjs";
import { RouteIncomingRequest } from "./contracts";
import { isRouteRequest } from "./utils";

export class PostInterceptorObserver implements Observer<any> {
    constructor(
       protected requests: Subject<RouteIncomingRequest>, 
       protected stream: Subject<any>,
       protected notify: Subject<any>
    ) {
    }

    next(value: any): void {
        const { requests, stream } = this;

        if (isRouteRequest(value)) {
            return requests.next(value);
        }

        return stream.next(value);
    }

    error(err: any): void {

    }

    complete(): void {
        this.notify.complete();
    }
}