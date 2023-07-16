import { RouteIncomingRequest } from "./RouteIncomingRequest";
import { ActivatedSnapshot } from "./ActivatedSnapshot";
export interface RouteIncomingSnapshot extends RouteIncomingRequest {
    snapshot: ActivatedSnapshot;
}
