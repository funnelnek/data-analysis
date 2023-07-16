import { Observable } from "rxjs";
import { HttpHandler } from "./contracts";
export declare class HttpXhrBackend implements HttpHandler {
    next(request: any): Observable<any>;
}
