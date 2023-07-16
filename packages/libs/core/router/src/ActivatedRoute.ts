import { InjectionToken } from "@funnelnek/ioc";
import { RouterState } from "@remix-run/router";
import { Subject } from "rxjs";
import { snapshot } from "./utils";

export const routerState = new Subject<RouterState>();

routerState.pipe(snapshot);

export const ACTIVATED_ROUTE = new InjectionToken(routerState);