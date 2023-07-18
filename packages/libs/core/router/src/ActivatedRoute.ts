import { InjectionToken } from "@funnelnek/ioc";
import { RouterState } from "@remix-run/router";
import { Subject } from "rxjs";
import { routeSnapshot } from "./utils";

export const routerState = new Subject<RouterState>();

routerState.pipe(routeSnapshot);

export const ACTIVATED_ROUTE = new InjectionToken(routerState);