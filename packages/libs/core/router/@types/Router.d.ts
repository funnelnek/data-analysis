import { Routing } from "./contracts";
import { AbstractRouting } from "./AbstractRouting";
export declare class Router extends AbstractRouting {
    readonly id: string;
    readonly path: string;
    constructor(_children: Routing[]);
}
