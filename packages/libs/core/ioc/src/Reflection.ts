import { ReflectionType } from "./constants";
import type { IReflection, Reflector, Type } from "./contracts";
import { ProviderFactory } from "./ProviderFactory";
import { isPrimitive } from "./utils";
import { injector as reflector } from "./Injector";


export class Reflection<T = any, K extends keyof T = any> implements IReflection {
    static isPrimitive(type: Type): boolean {
        return isPrimitive(type);
    }

    readonly type!: Type<T>;
    readonly isPrimitive!: boolean; 
    readonly scope!: ReflectionType;    
    readonly reflector!: Reflector;

    constructor(subject: T, injector?: Reflector);
    constructor(type: Type<T> | { [P in K]: T[P] }, property?: string | symbol, descriptor?: TypedPropertyDescriptor<T[K]>, injector?: Reflector);
    constructor(type: Type<T> | { [P in K]: T[P] }, property?: string | symbol, index?: number, injector?: Reflector);
    constructor(subject: any, injectorOrProperty?: unknown, descriptorOrIndex?: TypedPropertyDescriptor<T[K]> | number, injector: Reflector  = reflector) {
        let type: Type = this.type = subject instanceof Function ? subject : (subject as { constructor: Type }).constructor;
        let isDecorated = injectorOrProperty && (
            typeof injectorOrProperty === "string" ||
            typeof injectorOrProperty === "symbol" ||
            typeof injectorOrProperty === "number"
        );

        this.isPrimitive = isPrimitive(type);        

        if (injector) {
            this.reflector = injector;
        }

        if (descriptorOrIndex !== undefined) {
            if (typeof descriptorOrIndex !== "number") {
                if (descriptorOrIndex.get || descriptorOrIndex.set) {
                    this.scope = ReflectionType.ACCESSOR;
                } else if (descriptorOrIndex.value instanceof Function) {
                    this.scope = ReflectionType.METHOD;
                }
            }

            if (typeof descriptorOrIndex === "number") {
                this.scope = ReflectionType.PARAMETER;
            }

        }
        
        if (!isDecorated) {
            let obj = (injectorOrProperty as { constructor: Type });
            
            if (obj.constructor.name === "Injector") {
                this.reflector = injectorOrProperty as Reflector;
            }
        }

        if (!injectorOrProperty && this.provider) {
            this.scope = ReflectionType.CONSTRUCTOR;
        }
    }

    get provider(): ProviderFactory {
        return Reflect.getOwnMetadata("injectable", this.type);
    }

}