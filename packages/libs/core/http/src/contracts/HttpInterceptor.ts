import { Observable } from "rxjs";
import { HttpHandler } from "./HttpHandler";
import { HttpRequest } from "../HttpRequest";


export interface HttpInterceptor {
    intercept(request: HttpRequest<any>, handle: HttpHandler): Observable<any>;
}