import { Enumerable } from "@funnelnek/common";
import { GuardOptions, PipeTransformFn, InterceptorMiddleware, RouteGuard, PipeTransform, Routing } from ".";
import { RoutePipe } from "./RoutePipe";

export abstract class AbstractRouting implements Routing, Enumerable {
    [x: string]: any;
    readonly caseSensitive: boolean = false;
    
    constructor(protected _children: Routing[]) {
        let route = this.constructor;
        let loaderGuard: GuardOptions = Reflect.getOwnMetadata("route:guard:loader", route);
        let actionGuard: GuardOptions = Reflect.getOwnMetadata("route:guard:action", route);
        let loaderInterceptor = Reflect.getOwnMetadata("route:interceptor:loader", route);
        let actionInterceptor = Reflect.getOwnMetadata("route:interceptor:action", route);
        let loaderPipe: (PipeTransform | PipeTransformFn)[] = Reflect.getOwnMetadata("route:pipe:loader", route);
        let actionPipe = Reflect.getOwnMetadata("route:pipe:action", route);
        
        if (this.loader) {
            if (loaderPipe) {
                this.loader = new Proxy(this.loader, new RoutePipe(this, loaderPipe));
            }

            if (loaderInterceptor) {
                this.loader = new Proxy(this.loader, new InterceptorMiddleware(this, loaderInterceptor));
            }

            if (loaderGuard) {
                this.loader = new Proxy(this.loader, new RouteGuard(this, loaderGuard));
            }
        }
        
        if (this.action) {
            if (actionPipe) {
                this.action = new Proxy(this.action, new RoutePipe(this, actionPipe));
            }
    
            if (actionInterceptor) {
                this.action = new Proxy(this.action, new InterceptorMiddleware(this, actionInterceptor));
            }
    
            if (actionGuard) {
                this.action = new Proxy(this.action, new RouteGuard(this, actionGuard));
            }
        }
    }

    get children(): Routing[] {
        return this._children;
    }
}