import { InjectionToken } from "@funnelnek/ioc";
import { RouterState } from "@remix-run/router";
import { Subject } from "rxjs";
export declare const routerState: Subject<RouterState>;
export declare const ACTIVATED_ROUTE: InjectionToken<Subject<RouterState>>;
