import { ReflectionType } from "../constants";
import { ProviderFactory } from "../ProviderFactory";
import { Reflector } from "./Reflector";
import { Type } from "./Type";

export interface IReflection<T = any> {
    readonly type: Type<T>;
    readonly scope: ReflectionType;
    readonly reflector: Reflector;
    readonly isPrimitive: boolean; 
    provider?: ProviderFactory;
}