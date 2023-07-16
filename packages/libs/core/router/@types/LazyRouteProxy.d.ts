import { LazyRouteFunction, RouteObject } from "react-router";
import { Routing } from "./contracts";
import { ImmutableRouteKey } from "@remix-run/router/dist/utils";
export declare class LazyRouteProxy implements ProxyHandler<Routing> {
    protected route: Routing;
    protected _initialized: boolean;
    protected lazy: string[];
    protected _initializing: boolean;
    protected middleware: LazyRouteFunction<RouteObject>;
    protected statics: ImmutableRouteKey[];
    constructor(route: Routing);
    get(target: Routing, property: string | symbol, receiver: any): any;
    set(target: Routing, property: string | symbol, newValue: any, receiver: any): boolean;
    defineProperty(target: Routing, property: string | symbol, attributes: PropertyDescriptor): boolean;
    getOwnPropertyDescriptor(target: Routing, p: string | symbol): PropertyDescriptor | undefined;
    deleteProperty(target: Routing, p: string | symbol): boolean;
    ownKeys(target: Routing): ArrayLike<string | symbol>;
    preventExtensions(target: Routing): boolean;
    setPrototypeOf(target: Routing, v: object | null): boolean;
    isExtensible(target: Routing): boolean;
    has(target: Routing, property: string | symbol): boolean;
    set initialized(value: boolean);
    get initialized(): boolean;
    get initializing(): boolean;
    set initializing(value: boolean);
}
