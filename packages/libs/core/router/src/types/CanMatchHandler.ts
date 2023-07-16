import { Type } from "@funnelnek/ioc";
import { CanLoad } from "../contracts";
import { CanLoadFn } from "./CanLoadFn";

export type CanLoadHandler = Type<CanLoad> |  CanLoadFn;