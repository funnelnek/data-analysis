import { Router } from "./Router";


export const DefaultRoutingConfig = { 
    redirect: "/",
    parent: Router,
    providers: [],
    lazy: [
        "title",
        "handle",
        "element", 
        "Component", 
        "errorElement", 
        "ErrorBoundary",
        "shouldRevalidate"
    ] 
};