import { Type } from "../contracts";
import { InjectionToken } from "../InjectionToken";

export type Token<T = any> = Type<T> | InjectionToken<T> | string | symbol | any;