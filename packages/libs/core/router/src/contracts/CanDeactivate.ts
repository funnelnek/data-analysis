import { ComponentType } from "react";
import { CanDeactivateFn } from "../types/CanDeactivateFn";

export interface CanDeactivate<T extends ComponentType> {
    canDeactivate: CanDeactivateFn<T>;
}