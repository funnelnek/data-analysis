import { ComponentType } from "react";
import { CanActivateChildHandler } from "../types/CanActivateChildHandler";
import { CanActivateHandler } from "../types/CanActivateHandler";
import { CanDeactivateHandler } from "../types/CanDeactivateHandler";
import { CanLoadHandler } from "../types/CanMatchHandler";


export interface GuardConfig {
    canDeactivate?: CanDeactivateHandler<ComponentType>[];
    canLoad?: CanLoadHandler[];
    canActivate?: CanActivateHandler[];
    canActivateChild?: CanActivateChildHandler[];
}