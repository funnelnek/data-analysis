import { Type } from "./contracts";
import { SingletonProviderFactory } from "./contracts/SingletonProviderFactory";

export class SingletonClassProvider<T extends Type = any> implements SingletonProviderFactory<T> {
    #instance!: T;

    construct(target: T, args: any[], ctor: Function): object {
        if (this.#instance) return this.#instance;

        return this.#instance = Reflect.construct(target, args, ctor);
    }

    get(target: T, p: string | symbol, receiver: any) {
        if (p === "__isProxy") {
            return true;
        }
        
        return Reflect.get(target, p, receiver);
    }

    set(target: T, p: string | symbol, newValue: any, receiver: any): boolean {
        return Reflect.set(target, p, newValue, receiver);
    }

    has(target: T, p: string | symbol): boolean {
        return Reflect.has(target, p);
    }

    deleteProperty(target: T, p: string | symbol): boolean {
        return Reflect.deleteProperty(target, p);
    }

    defineProperty(target: T, property: string | symbol, attributes: PropertyDescriptor): boolean {
        return Reflect.defineProperty(target, property, attributes);
    }

    getOwnPropertyDescriptor(target: T, p: string | symbol): PropertyDescriptor | undefined {
        return Reflect.getOwnPropertyDescriptor(target, p);
    }

    getPrototypeOf(target: T): object | null {
        return Reflect.getPrototypeOf(target);
    }

    setPrototypeOf(target: T, v: object | null): boolean {
        return Reflect.setPrototypeOf(target, v);
    }

    isExtensible(target: T): boolean {
        return Reflect.isExtensible(target);
    }

    ownKeys(target: T): ArrayLike<string | symbol> {
        return Reflect.ownKeys(target);
    }

    preventExtensions(target: T): boolean {
        return Reflect.preventExtensions(target);
    }
}