import { ActivatedRouteSnapshot } from "./ActivatedRouteSnapshot";
import { RouterStateSnapshot } from "./RouterStateSnapshot";


export interface ActivatedSnapshot {
    route: ActivatedRouteSnapshot;
    router: RouterStateSnapshot;
}