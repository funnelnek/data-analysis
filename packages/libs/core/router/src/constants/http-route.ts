import { InjectionToken } from "@funnelnek/ioc";
import { Routing } from "../contracts";


export const HTTP_ROUTE = new InjectionToken<Routing[]>([], true);