import { ActionFunctionArgs, LoaderFunctionArgs, Params } from "react-router";
export declare class RouteDataRequest implements LoaderFunctionArgs, ActionFunctionArgs {
    request: Request;
    params: Params<string>;
    context?: any;
}
