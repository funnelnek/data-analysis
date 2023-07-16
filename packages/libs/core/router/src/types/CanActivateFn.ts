import { Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "../contracts";

export type CanActivateFn = (route: ActivatedRouteSnapshot, router: RouterStateSnapshot) => Observable<boolean> | Promise<boolean> | boolean;