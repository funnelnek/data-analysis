import { RouterState } from "@remix-run/router";
import { Observable } from "rxjs";
import { RouteIncomingSnapshot } from "../contracts";
export declare const snapshot: (request: Observable<RouterState>) => Observable<RouteIncomingSnapshot>;
