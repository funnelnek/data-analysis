import { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
export type RouteProxyRequest = [LoaderFunctionArgs] | [ActionFunctionArgs];
