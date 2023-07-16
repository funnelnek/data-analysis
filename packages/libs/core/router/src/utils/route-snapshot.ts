import { RouterState } from "@remix-run/router";
import { Observable, Subject } from "rxjs";
import { RouteIncomingSnapshot } from "../contracts";

export const snapshot = (request: Observable<RouterState>): Observable<RouteIncomingSnapshot> => {
    let stream = new Subject<RouteIncomingSnapshot>();
    
    let subscription = request.subscribe({
        next: (incoming) => {
            
        },
        error(err) {
            stream.error(err);
        },
        complete() {
            subscription.unsubscribe();
            stream.complete();
        }
    });  

    return stream;
}