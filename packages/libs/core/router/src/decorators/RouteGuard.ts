import { Type } from "@funnelnek/ioc"
import { Guardian } from "../contracts"


export const RouteGuard = (options?: any) => {
    return (route: Type<Guardian>): void => {

    }
}