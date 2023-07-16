import { Observable } from "rxjs";
import { HttpHandler } from "./contracts"

export class HttpXhrBackend implements HttpHandler {
    next(request: any): Observable<any> {
        throw new Error("Method not implemented.");
    }
}