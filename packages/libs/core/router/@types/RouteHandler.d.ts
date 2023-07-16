import { Enumerable } from "@funnelnek/common";
import { Navigator, RouteIncomingSnapshot, Routing } from "./contracts";
export declare class RouteHandler implements Navigator, Enumerable {
    protected route: Routing;
    [k: string]: any;
    constructor(route: Routing);
    isLoading(): boolean;
    isReloading(): boolean;
    isRedirecting(): boolean;
    snapshot(activatedRouteSnapshot: RouteIncomingSnapshot): void;
}
