import { Enumerable } from "@funnelnek/common"
import { RouteConfig } from "../contracts";
import { DefaultRoutingConfig } from "../DefaultRoutingConfig";

export const Lazy = (isLazy: boolean = true) => {
    return <T extends Enumerable, K extends keyof T>(proto: T, property: string, descriptor?: TypedPropertyDescriptor<T[K]>): void => {
        const route = proto.constructor;
        const config: RouteConfig = Reflect.getOwnMetadata("route:config", route) ?? { lazy: DefaultRoutingConfig.lazy };

        if (!isLazy) {           
            config.lazy = config.lazy.filter(name => property !== name);
            return;            
        }

        if (!config.lazy.includes(property)) {
            config.lazy.push(property);
        }
    }
}