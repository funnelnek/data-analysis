import { ActionFunctionArgs, LoaderFunctionArgs, Params } from "react-router";


export class RouteDataRequest implements LoaderFunctionArgs, ActionFunctionArgs {
    request!: Request;
    params!: Params<string>;
    context?: any;
}