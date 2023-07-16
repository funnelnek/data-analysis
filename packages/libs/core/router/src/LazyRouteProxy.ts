import { LazyRouteFunction, RouteObject } from "react-router";
import { RouteConfig, Routing } from "./contracts";
import { RouteLazyLoader } from "./RouteLazyLoader";
import { ImmutableRouteKey } from "@remix-run/router/dist/utils"


export class LazyRouteProxy implements ProxyHandler<Routing> {
    protected _initialized: boolean = false;
    protected lazy: string[] = [];
    protected _initializing: boolean = false;
    protected middleware: LazyRouteFunction<RouteObject>;
    protected statics: ImmutableRouteKey[] = ["lazy", "id", "path", "index", "children", "caseSensitive"];

    constructor(protected route: Routing) {
        const ctor = route.constructor;
        const config: RouteConfig = Reflect.getOwnMetadata("route:config", ctor);
        const lazy: string[] = this.lazy = config.lazy;

        this.middleware = new Proxy(route.lazy as LazyRouteFunction<RouteObject>, new RouteLazyLoader(this));
    }

    get(target: Routing, property: string | symbol, receiver: any) {
        if (property === "lazy" && !this.initialized) {
            return this.middleware;
        }

        if (!this.initialized) {
            if (this.statics.includes(property as ImmutableRouteKey)) {
                return Reflect.get(target, property, receiver);
            }

            if (this.lazy.includes(property as string)) {
                return undefined;
            }
        }

        return Reflect.get(target, property, receiver);
    }

    set(target: Routing, property: string | symbol, newValue: any, receiver: any): boolean {  
        if (property === "lazy" && newValue === undefined) {
            this.initialized = true;
        }

        return Reflect.set(target, property, newValue, receiver);
    }

    defineProperty(target: Routing, property: string | symbol, attributes: PropertyDescriptor): boolean {
        return Reflect.defineProperty(target, property, attributes);
    }

    getOwnPropertyDescriptor(target: Routing, p: string | symbol): PropertyDescriptor | undefined {
        return Reflect.getOwnPropertyDescriptor(target, p);
    }

    deleteProperty(target: Routing, p: string | symbol): boolean {
        return Reflect.deleteProperty(target, p);
    }

    ownKeys(target: Routing): ArrayLike<string | symbol> {
        return Reflect.ownKeys(target);
    }

    preventExtensions(target: Routing): boolean {
        return Reflect.preventExtensions(target);   
    }

    setPrototypeOf(target: Routing, v: object | null): boolean {
        return Reflect.setPrototypeOf(target, v);
    }

    isExtensible(target: Routing): boolean {
        return Reflect.isExtensible(target);
    }

    has(target: Routing, property: string | symbol): boolean {
        if(this.lazy.includes(property as string)) {
            if(!this.initialized) {
                return false;
            }
        }

        return Reflect.has(target, property);
    }

    set initialized(value: boolean) {
        this._initialized = value;
    }

    get initialized(): boolean {
        return this._initialized;
    }

    get initializing(): boolean {
        return this._initializing;
    }

    set initializing(value: boolean) {
        this._initializing = value;
    }
}