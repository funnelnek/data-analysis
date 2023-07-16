import { InjectionToken } from "../InjectionToken";

export type ValueToken<T = any> = InjectionToken<T> | string | symbol;