import { Data } from "@funnelnek/common";
import { AgnosticDataRouteMatch, Location } from "@remix-run/router";
import { Navigation } from "react-router";


export interface RouterStateSnapshot { 
    navigation: Navigation;
    location: Location;
    matches: AgnosticDataRouteMatch[];
    data: { loader: Data, action: Data | null };
}