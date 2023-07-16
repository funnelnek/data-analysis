import { Enumerable } from "@funnelnek/common";
import { Navigator, RouteIncomingSnapshot, Routing } from "./contracts";

export class RouteHandler implements Navigator, Enumerable {
    [k: string]: any;

    constructor(protected route: Routing) {}

    isLoading(): boolean {
        throw new Error("Method not implemented.");
    }
    isReloading(): boolean {
        throw new Error("Method not implemented.");
    }
    isRedirecting(): boolean {
        throw new Error("Method not implemented.");
    }
    snapshot(activatedRouteSnapshot: RouteIncomingSnapshot) {
        throw new Error("Method not implemented.");
    }
}