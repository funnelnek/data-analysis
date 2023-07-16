import { BehaviorSubject, Observable, Observer, Subject } from "rxjs";
import { RouteIncomingRequest } from "./contracts";
import { RouteInterceptor } from "./contracts/RouteInterceptor";

export class InterceptorObserver implements Observer<RouteIncomingRequest> {
    constructor(
        protected requests: Subject<RouteIncomingRequest>,
        protected interceptors: RouteInterceptor[], 
        protected stream: Subject<any>, 
        protected latestResponse: BehaviorSubject<Observable<any>>,
        protected reset: Subject<void>
    ) {
    }

    next(request: RouteIncomingRequest): void {
        const { interceptors, requests, stream, latestResponse, reset } = this;
        let latestRequest = new BehaviorSubject(request);
        let req!: RouteIncomingRequest, res!: Observable<any>;

        latestRequest.subscribe(request => req = request);
        latestResponse.subscribe(response => res = response);

        let done = false;
        let progress = 0;
        let completed = false;
        let completion = interceptors.length;
        let interrupted = false;

        do {
            let { intercept } = interceptors[progress];
            let handleNext = false;

            latestResponse.next(
                intercept(req, { next: (request) => {
                    handleNext = true;
                    latestRequest.next(request);
                    return res;
                }})
            );

            completed = ++progress === completion;
            interrupted = !handleNext;

            if (interrupted || completed) {
                done = true;
            }            
        } while (!done);        
        
        if (interrupted) {
            reset.next();
            return stream.next(res);
        }

        return requests.next(req);
    }

    error(err: any): void {
        this.stream.error(err);
    }

    complete(): void {
        this.stream.complete();
    } 
}