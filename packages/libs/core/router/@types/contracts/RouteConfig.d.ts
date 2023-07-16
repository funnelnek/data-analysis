import { Enumerable } from "@funnelnek/common";
import { Provider, Type } from "@funnelnek/ioc";
import { Router } from "../Router";
import { ResolveFn } from "../types/ResolveFn";
import { GuardConfig } from "./GuardConfig";
export interface RouteConfig extends GuardConfig {
    redirect?: string;
    data?: Enumerable;
    resolve?: Enumerable<ResolveFn>;
    providers: Provider[];
    parent: Type<Router>;
    lazy: string[];
}
