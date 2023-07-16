import { Router as RemixRouter } from "@remix-run/router";
import { RouteIncomingSnapshot } from "./RouteIncomingSnapshot";


export interface IRouter {
    subscribe(state: RouteIncomingSnapshot): void
}