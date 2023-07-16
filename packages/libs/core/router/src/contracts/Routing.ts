import { ActionFunction, LazyRouteFunction, LoaderFunction, RouteObject, ShouldRevalidateFunction } from "react-router";
import { RouteHandling } from "../types/RouteHandling";


export interface Routing {
    title?: string;
    caseSensitive?: boolean;
    path?: string;
    id?: string;
    loader?: LoaderFunction;
    action?: ActionFunction;
    hasErrorBoundary?: boolean;
    shouldRevalidate?: ShouldRevalidateFunction;
    handle?: RouteHandling;
    index?: boolean;
    children?: Routing[];
    element?: React.ReactNode | null;
    errorElement?: React.ReactNode | null;
    Component?: React.ComponentType<any> | null;
    ErrorBoundary?: React.ComponentType | null;
    lazy?: LazyRouteFunction<RouteObject>;
}