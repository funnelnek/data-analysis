import { RouteIncomingSnapshot } from "./RouteIncomingSnapshot";
export interface IRouter {
    subscribe(state: RouteIncomingSnapshot): void;
}
