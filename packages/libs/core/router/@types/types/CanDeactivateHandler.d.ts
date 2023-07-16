import { Type } from "@funnelnek/ioc";
import { ComponentType } from "react";
import { CanDeactivate } from "../contracts/CanDeactivate";
import { CanDeactivateFn } from "./CanDeactivateFn";
export type CanDeactivateHandler<T extends ComponentType> = Type<CanDeactivate<T>> | CanDeactivateFn<T>;
