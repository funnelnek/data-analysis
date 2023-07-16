import { RouteIncomingSnapshot } from "./RouteIncomingSnapshot";

export interface Navigator {
    isLoading(): boolean;
    isReloading(): boolean;
    isRedirecting(): boolean;
    snapshot(activatedRouteSnapshot: RouteIncomingSnapshot): void;
}