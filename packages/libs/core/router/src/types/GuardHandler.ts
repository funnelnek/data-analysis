import { ComponentType } from "react";
import { CanActivateChildFn } from "./CanActivateChildFn";
import { CanActivateFn } from "./CanActivateFn";
import { CanDeactivateFn } from "./CanDeactivateFn";
import { CanLoadFn } from "./CanLoadFn";

export type GuardHandler = CanDeactivateFn<ComponentType> | CanLoadFn | CanActivateChildFn | CanActivateFn;