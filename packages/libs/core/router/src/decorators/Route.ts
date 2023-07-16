import { Routing } from "../contracts";
import { Type, Injectable, Reflector, ProviderFactory, injector as reflector } from "@funnelnek/ioc";
import { RouteOptions } from "../types/RouteOptions";
import { HTTP_ROUTE } from "../constants";
import { Router } from "../Router";
import { DefaultRoutingConfig } from "../DefaultRoutingConfig";


export const Route = (options: RouteOptions = DefaultRoutingConfig) => {    
    return (route: Type<Routing>): void => {       
        let injector!: Reflector;
        let parent!: Type<Routing> | undefined;
        let forChild!: boolean;
        let parentProvider!: ProviderFactory;

        if (typeof options === "object") {
            parent = options.parent;
        } 
        
        if (
            options instanceof Function && 
            options.prototype instanceof Router
        ) {
            parent = options;
        }

        if (!parent) {
            throw new Error("Invalid parent route");
        }
        
        parentProvider = Reflect.getOwnMetadata("injectable", parent);

        if (!parentProvider) {
            throw new Error("Parent route provide is undefined");
        }

        injector = parentProvider.injector;

        if (parent !== Router) {
            forChild = true;
        }

        if (forChild) {
            let thisInjector = reflector.create(injector);
            let thisProvider = new ProviderFactory({ provide: HTTP_ROUTE, useClass: route, multi: true }, injector);

            Reflect.defineMetadata("route:provider", thisProvider, route);
            Injectable({ providedIn: thisInjector })(route);
            return;
        }

        Injectable({
            multi: true,
            provides: HTTP_ROUTE,
            providedIn: injector 
        })(route);
    }
}