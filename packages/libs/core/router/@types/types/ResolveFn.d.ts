import { Observable } from "rxjs";
import { ActivatedRouteSnapshot } from "../contracts/ActivatedRouteSnapshot";
import { RouterStateSnapshot } from "../contracts/RouterStateSnapshot";
export type ResolveFn<T = any> = (route: ActivatedRouteSnapshot, router: RouterStateSnapshot) => Observable<T> | Promise<T> | T;
