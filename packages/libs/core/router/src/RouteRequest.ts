import { RouteIncomingRequest } from "./contracts";
import { RouteFetcherArgs, RouteFetcher } from "./types";

export class RouteRequest implements RouteIncomingRequest {
    readonly incoming: RouteFetcherArgs;
    readonly fetcher: RouteFetcher;
    readonly context: any;

    constructor(incoming: RouteFetcherArgs, context: any, fetcher: RouteFetcher) {
        this.incoming = incoming;
        this.fetcher = fetcher;
        this.context = context;
    }
}