import { RouteFetcher } from "../types/RouteFetcher";
import { RouteFetcherArgs } from "../types/RouteFetcherArgs";
import { Routing } from "./Routing";
export interface RouteIncomingRequest {
    incoming: RouteFetcherArgs;
    fetcher: RouteFetcher;
    context: Routing;
}
