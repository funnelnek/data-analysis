import { Type } from "@funnelnek/ioc";
import { CanActivate } from "../contracts";
import { CanActivateFn } from "./CanActivateFn";


export type CanActivateHandler = Type<CanActivate> | CanActivateFn;