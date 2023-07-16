import { InjectionToken } from "../InjectionToken";
import { Token } from "../types";
import { IProviderFactory } from "./IProviderFactory";

import { Type } from "./Type";

export interface Reflector {
    has(injectable: Token): boolean;
    get<T = any>(injectable: Type<T>): T;
    get<T = any>(injectable: InjectionToken<T>): T;
    get<T = any>(injectable: T): T;  
    register(provider: IProviderFactory): any;
    create(parent?: Reflector): Reflector;
}