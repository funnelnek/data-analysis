import { RouteRequest } from "../RouteRequest"

export const isRouteRequest = (request: any): boolean => {
    return (
        request instanceof RouteRequest ||
        "incoming" in request &&
        "fetcher" in request && 
        "context" in request
    )
}