import { Observable } from "rxjs";
import { ActivatedRouteSnapshot } from "../contracts/ActivatedRouteSnapshot";
import { RouterStateSnapshot } from "../contracts/RouterStateSnapshot";
import { CanActivateResult } from "./CanActivateResult";

export type CanActivateChildFn = (route: ActivatedRouteSnapshot, router: RouterStateSnapshot) => CanActivateResult;