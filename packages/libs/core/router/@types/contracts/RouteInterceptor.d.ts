import { Observable } from "rxjs";
import { InterceptorHandler } from "./InterceptorHandler";
import { RouteIncomingRequest } from "./RouteIncomingRequest";
export interface RouteInterceptor {
    intercept(request: RouteIncomingRequest, next: InterceptorHandler): Observable<any>;
}
