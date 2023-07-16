import { Enumerable } from "@funnelnek/common";
import { ClassDecorator } from "@funnelnek/ioc";
import { MiddlewareContext } from "../types/MiddlewareContext";


export const Middleware = (scope?: "pre" | "post" | "all"): ClassDecorator => {
    return (middleware: MiddlewareContext): void => {        
        let method: string;
        let proto = middleware.prototype;
        scope = scope ? scope : "all";

        if ("can" in proto) {
            method = "can";
        }

        if ("canDeactivate" in proto) {
            method = "canDeactivate";
        }

        if ("canLoad" in proto) {
            method = "canLoad";
        }

        if ("canActivate" in proto) {
            method = "canActivate";
        }

        if ("canActivateChild" in proto) {
            method = "canActivateChild";
        }

        if ("intercept" in proto) {
            method = "intercept";
        }   

        if ("transform" in proto) {
            method = "transform";
        }

        if (method! === undefined) {
            throw new Error("Unable detect middleware type " + middleware.name);
        }

        Reflect.defineMetadata("route:middleware", {method, scope}, middleware);
        Reflect.defineMetadata("route:middleware", {method, scope}, proto, (proto as Enumerable)[method]);
    }
}