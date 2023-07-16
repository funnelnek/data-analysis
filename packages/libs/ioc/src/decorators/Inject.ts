import { Type } from "../contracts";
import { InjectionToken } from "../InjectionToken";


export const Inject = (token: InjectionToken) => {
    return (target: Type | object, method: string | symbol | undefined, index: number): void => {
        
    }
}