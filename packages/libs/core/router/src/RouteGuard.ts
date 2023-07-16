import { Observable } from "rxjs";
import { Guardian, Routing, RouteIncomingRequest } from "./contracts";
import { RouteMiddleware } from "./RouteMiddleware";
import { GuardOptions } from "./types";


export class RouteGuard extends RouteMiddleware {
    protected guards: Guardian[] = [];
    protected deactivateGuards: Guardian[] = [];
    protected canLoadGuards: Guardian[] = [];
    
    constructor (protected route: Routing, protected config: GuardOptions) {
        super(route);
    }
    
    
    protected handle(request: Observable<RouteIncomingRequest>): Observable<RouteIncomingRequest> {
        throw new Error("Method not implemented.");
    }   
}