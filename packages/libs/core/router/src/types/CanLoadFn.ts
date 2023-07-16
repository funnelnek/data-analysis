import { RouteMatch } from "react-router";
import { Observable } from "rxjs";
import { Routing } from "../contracts";
import { CanActivateResult } from "./CanActivateResult";

export type CanLoadFn = (route: Routing, matches: RouteMatch[]) => CanActivateResult;