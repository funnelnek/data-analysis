import { Type } from "@funnelnek/ioc";
import { CanActivateChild } from "../contracts/CanActivateChild";
import { CanActivateChildFn } from "./CanActivateChildFn";
export type CanActivateChildHandler = Type<CanActivateChild> | CanActivateChildFn;
