import { ComponentType } from "react";
import { CanActivateChildHandler } from "./CanActivateChildHandler";
import { CanActivateHandler } from "./CanActivateHandler";
import { CanDeactivateHandler } from "./CanDeactivateHandler";
import { CanLoadHandler } from "./CanMatchHandler";
export type RoutingGuard = CanActivateHandler | CanActivateChildHandler | CanLoadHandler | CanDeactivateHandler<ComponentType>;
