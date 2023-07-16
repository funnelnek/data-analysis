import { Observable } from "rxjs";
import { RouteIncomingRequest } from "./RouteIncomingRequest";
export interface InterceptorHandler {
    next(request: RouteIncomingRequest): Observable<any>;
}
