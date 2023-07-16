import { Data } from "@funnelnek/common";
import { ComponentType } from "react";
import { Params } from "react-router";
import { Routing } from "./Routing";
export interface ActivatedRouteSnapshot {
    config: Routing;
    url: string;
    params: Params;
    data: Data;
    Component: ComponentType;
}
