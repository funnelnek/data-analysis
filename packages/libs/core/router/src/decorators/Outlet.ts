import { Routing } from "../contracts";
import { TemplateOptions } from "../contracts/TemplateOptions";
import { Lazy } from "./Lazy";


export const Outlet = (options?: TemplateOptions) => {
    return <T extends Routing, K extends "element" | "Component">(prototype: T, property: K, descriptor?: TypedPropertyDescriptor<T[K]>) => {
        let route = prototype.constructor;

        Reflect.defineMetadata("route:template", { key: property }, route);

        if (!options) {
            options = { lazy: false };

            if ("lazy" in prototype) {
                options.lazy = true;
            }
        }

        if (!options.lazy) {
            options.lazy = false;
        }

        Lazy(options.lazy)(prototype, property, descriptor);
    }
}