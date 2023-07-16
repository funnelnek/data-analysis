import { ComponentType } from "react";
import { BehaviorSubject, Observable } from "rxjs";
import { next } from "@funnelnek/observable";
import { MIDDLEWARE } from "./constants";
import { Guardian, RouteIncomingSnapshot, NavigationSnapshot } from "./contracts";
import { CanActivateChildFn, CanActivateFn, CanDeactivateFn, CanLoadFn, GuardianCanFn, GuardianResult, GuardHandler } from "./types";


export class RouteGuardian implements Guardian {
    protected handler: unknown;
    protected config: { scope: MIDDLEWARE, method: string}
    constructor(handler: GuardHandler) {
        this.handler = handler;
        let config = this.config = Reflect.getMetadata("route:middlware", handler);

        if (config === undefined) {
            throw new Error("Route middleware is undefined");
        }
    }

    can(requestOrResponse: RouteIncomingSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        let { handler, config: { method, scope }} = this;        
        let { snapshot: {route, router} } = requestOrResponse as RouteIncomingSnapshot;
        let { Component } = route;
        let { navigation, matches } = router;
        let nextRoute: NavigationSnapshot = { url: navigation.location?.pathname as string };
        let stream = new BehaviorSubject<boolean>(true);
        let result: GuardianResult = true;

        switch (method) {
            case "can":
                result = (handler as GuardianCanFn)(requestOrResponse) as GuardianResult;
                break;
            case "canDeactivate":
                result = (handler as CanDeactivateFn<ComponentType>)(Component, route, router, nextRoute) as GuardianResult;
                break;
            case "canLoad":
                result = (handler as CanLoadFn)(route, matches) as GuardianResult;
                break;
            case "canActivate":
                result = (handler as CanActivateFn)(route, router) as GuardianResult;
                break;
            case "canActivateChild":
                result = (handler as CanActivateChildFn)(route, router) as GuardianResult;
                break;
        }

        next(stream, result);
        return stream.asObservable();
    }
}