import { Observable } from "rxjs";
import { HttpRequest } from "../HttpRequest";
export interface HttpHandler<T = any> {
    next(request: HttpRequest<T>): Observable<any>;
}
