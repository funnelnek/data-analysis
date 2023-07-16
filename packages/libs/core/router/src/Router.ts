import { RouteConfig, Routing } from "./contracts";
import { Inject, Service } from "@funnelnek/ioc";
import { HTTP_ROUTE } from "./constants/http-route";
import { AbstractRouting } from "./AbstractRouting";
import { LazyRouteProxy } from "./LazyRouteProxy";
import { RouteHandler } from "./RouteHandler";


@Service()
export class Router extends AbstractRouting {
    readonly id: string = "root";
    readonly path: string = "/";

    constructor(@Inject(HTTP_ROUTE) _children: Routing[]) {
        super (_children);

        let route = this.constructor;
        let prototype = route.prototype;
        let isLazy = prototype.hasOwnProperty("lazy");
        let config: RouteConfig = Reflect.getOwnMetadata("route:config", route);

        if (isLazy) {
            if (!config.lazy.includes("handle")) {
                if (!this.hasOwnProperty("handle") || !prototype.hasOwnProperty("handle")) {
                    this.handle = new RouteHandler(this);
                } else {
                    this.handle = Object.assign(new RouteHandler(this), this.handle);
                }

                this.handle = new RouteHandler(this);
            }

            return new Proxy(this, new LazyRouteProxy(this));
        }

        if (!this.hasOwnProperty("handle") || !prototype.hasOwnProperty("handle")) {
            this.handle = new RouteHandler(this);
        } else {
            this.handle = Object.assign(new RouteHandler(this), this.handle);
        }
    }
}