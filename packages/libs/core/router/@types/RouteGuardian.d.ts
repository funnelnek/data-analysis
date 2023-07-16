import { Observable } from "rxjs";
import { MIDDLEWARE } from "./constants";
import { Guardian, RouteIncomingSnapshot } from "./contracts";
import { GuardHandler } from "./types";
export declare class RouteGuardian implements Guardian {
    protected handler: unknown;
    protected config: {
        scope: MIDDLEWARE;
        method: string;
    };
    constructor(handler: GuardHandler);
    can(requestOrResponse: RouteIncomingSnapshot): boolean | Observable<boolean> | Promise<boolean>;
}
