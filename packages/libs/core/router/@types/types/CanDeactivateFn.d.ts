import { ComponentType } from "react";
import { ActivatedRouteSnapshot } from "../contracts/ActivatedRouteSnapshot";
import { NavigationSnapshot } from "../contracts/NavigationSnapshot";
import { RouterStateSnapshot } from "../contracts/RouterStateSnapshot";
import { CanActivateResult } from "./CanActivateResult";
export type CanDeactivateFn<T extends ComponentType> = (component: T, route: ActivatedRouteSnapshot, router: RouterStateSnapshot, next: NavigationSnapshot) => CanActivateResult;
