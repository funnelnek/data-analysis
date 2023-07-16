import { Observable } from "rxjs";
import { RouteIncomingSnapshot } from "./RouteIncomingSnapshot";


export interface Guardian {
    can(request: RouteIncomingSnapshot): Observable<boolean> | Promise<boolean> | boolean;
}