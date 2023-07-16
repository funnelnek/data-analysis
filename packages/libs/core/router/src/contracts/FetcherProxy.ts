import { ActionFunction, ActionFunctionArgs, LoaderFunction, LoaderFunctionArgs } from "react-router";


export interface FetcherProxy extends ProxyHandler<LoaderFunction|ActionFunction> {
    apply(loader: LoaderFunction, context: any, args: [LoaderFunctionArgs]): any;
    apply(action: ActionFunction, context: any, args: [ActionFunctionArgs]): any;
}