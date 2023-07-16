import { Type } from "@funnelnek/ioc";
import { ComponentType } from "react";
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad } from "../contracts";
export type GuardConstructor = Type<CanDeactivate<ComponentType>> | Type<CanActivate> | Type<CanLoad> | Type<CanActivateChild>;
