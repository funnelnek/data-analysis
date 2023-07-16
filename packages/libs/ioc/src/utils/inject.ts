import { Type } from "../contracts";
import { InjectionToken } from "../InjectionToken";
import { injector } from "../Injector";
import { Token } from "../types";


export function inject<T = any>(token: Type<T>): T;
export function inject<T = any>(token: InjectionToken<T>): T;
export function inject<T = any>(token: T): T;
export function inject<T extends Token = Token>(token: T): T {
    return injector.get(token);
}