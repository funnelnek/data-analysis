import { Type } from "@funnelnek/ioc";
import { Guardian } from "../contracts";
export declare const RouteGuard: (options?: any) => (route: Type<Guardian>) => void;
