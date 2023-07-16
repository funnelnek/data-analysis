import { Enumerable } from "@funnelnek/common";
import { Routing } from ".";
export declare abstract class AbstractRouting implements Routing, Enumerable {
    protected _children: Routing[];
    [x: string]: any;
    readonly caseSensitive: boolean;
    constructor(_children: Routing[]);
    get children(): Routing[];
}
