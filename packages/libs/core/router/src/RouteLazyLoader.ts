import { Enumerable } from "@funnelnek/common";
import { LazyRouteFunction, RouteObject } from "react-router";
import { RouteConfig, Routing } from "./contracts";
import { LazyRouteProxy } from "./LazyRouteProxy";
import { RouteHandler } from "./RouteHandler";
import { Router } from "./Router";

export class RouteLazyLoader implements ProxyHandler<LazyRouteFunction<RouteObject>> {
    protected initialized: boolean = false;
    constructor(
        protected proxy: LazyRouteProxy
    ) {
    }

    apply(target: LazyRouteFunction<RouteObject>, route: Routing, args: []) {   
        if (!this.initialized) {
            let definition = Reflect.apply(target, route, args);
            
            if (definition instanceof Promise) {
                this.proxy.initializing = true;

                return definition.then(options => {
                    if (!(options instanceof Router)) {
                        return options;
                    }

                    let routeConfig: RouteConfig = Reflect.getOwnMetadata("route:config", route.constructor);
                    let config: RouteObject & Enumerable = { ...options };

                    [
                        "lazy",
                        "id", 
                        "path", 
                        "index", 
                        "children", 
                        "caseSensitive"
                    ].forEach((k) => {
                        config[k] = undefined;
                    });

                    if (!routeConfig.lazy.includes("loader") && "loader" in config) {
                        config.loader = undefined;
                    }

                    if (!routeConfig.lazy.includes("action") && "action" in config) {
                        config.action = undefined;
                    }

                    if (!routeConfig.lazy.includes("handle") && "handle" in config) {
                        config.handle = undefined;
                    }

                    if (routeConfig.lazy.includes("handle") && "handle" in config) {
                        config.handle = Object.assign(new RouteHandler(route), config.handle);
                    }

                    this.initialized = true;

                    return config;
                });
            }
        }
    }
}