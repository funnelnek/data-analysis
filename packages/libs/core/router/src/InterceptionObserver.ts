import { BehaviorSubject, Observable, Observer, Subject } from "rxjs";
import { RouteIncomingRequest } from "./contracts";
import { InterceptorHandler } from "./contracts/InterceptorHandler";
import { RouteInterceptor } from "./contracts/RouteInterceptor";

export class InterceptionObserver implements Observer<RouteInterceptor> {
    protected request!: RouteIncomingRequest;    
    protected response!: Observable<any>;

    constructor(
        protected notifier: Subject<any>,
        protected responses: BehaviorSubject<Observable<any>>
    ) {
        notifier.subscribe((request => this.request = request));
        responses.subscribe((response => this.response = response));
    }

    next({ intercept }: RouteInterceptor): void {
        const { request, handler, responses } = this;
        
        responses.next(intercept(request, handler)); 
    }

    error(exception: any): void {
        this.notifier.error(exception);
    }

    complete(): void {
        this.notifier.complete();
    }

    protected get handler(): InterceptorHandler {
        const { response, notifier: notify } = this;        

        return {
            next(request): Observable<any> {
                notify.next(request);

                return response;
            },
        }
    }
}