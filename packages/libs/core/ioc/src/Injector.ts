import { ExistingProvider, Reflector, Type } from "./contracts";
import { Token } from "./types";
import { InjectionToken } from "./InjectionToken";
import { ProviderFactory } from "./ProviderFactory";
import { ExistingProviderNotFoundError, InvalidMultiProviderError, InvalidProviderFactoryError, UndefinedProviderFactoryError } from "./exception.ts";
import { DuplicateProviderError } from "./exception.ts/DuplicateProviderError";
import { isProxy } from "./utils";

class Injector implements Reflector {
    static #injectors: Set<Reflector> = new Set<Reflector>();
    static #instance: Reflector;

    static get instance(): Reflector {
        return Injector.#instance;
    }

    static create(parent?: Reflector): Reflector {
        let injector = new Injector(parent ?? Injector.#instance);
        Injector.#injectors.add(injector);

        return injector;
    }

    create(parent?: Reflector): Reflector {
        return Injector.create(parent);
    }

    protected injectables = new Map<Token, ProviderFactory| ProviderFactory[]>();
    protected parent: Reflector | undefined;    

    protected constructor(parent?: Reflector) {
        if (Injector.#instance === undefined) {
            //let descriptor = Object.getOwnPropertyDescriptor(Injector, "#instance") as PropertyDescriptor;
            
            Injector.#instance = this;
            
            // if (descriptor.configurable) {
            //     descriptor.configurable = false;
            // };

            // if (descriptor.writable) {
            //     descriptor.writable = false;
            // }

            // if (descriptor.enumerable) {
            //     descriptor.enumerable = false;
            // }
        }

        if (parent) {
            this.parent = parent;
        }
    }

    get<T = any>(injectable: Type<T>): T;
    get<T = any>(injectable: InjectionToken<T>): T;
    get<T = any>(injectable: T): T;
    get(token: unknown): any {
        let provider = this.getProvider(token);
        
        if (provider === undefined) {
            throw new Error("Injectable was not found");
        }
        
        if (provider instanceof Array) {
            return provider.map(injectable => injectable.implements);
        }

        return provider.implements;
    }

    has(injectable: any): boolean {        
        if(isProxy(injectable)) {
            let provider = Reflect.getOwnMetadata("injectable", injectable);
            return this.injectables.has(provider.provide);
        }

        return this.injectables.has(injectable);
    }

    register(provider: ProviderFactory): any {
        if (provider == undefined) {
            throw new UndefinedProviderFactoryError();
        }

        if (!(provider instanceof ProviderFactory)) {
            throw new InvalidProviderFactoryError();
        }

        let { provide : token, type, multi, options } = provider;
        let exists: boolean = this.has(token);

        if (exists) {
            let existing = this.injectables.get(token);

            if (!existing) {
                throw new ExistingProviderNotFoundError();
            }

            if (type === "ExistingProvider") {
                let alias = (options as ExistingProvider).useExisting;
                let aliasProviders: ProviderFactory | ProviderFactory[] | undefined = this.getProvider(alias);

                if (aliasProviders === undefined) {
                    throw new ExistingProviderNotFoundError();
                }

                this.injectables.set(token, aliasProviders);
                return;
            }

            if (existing instanceof Array) {
                if (existing.every(provider => provider.multi) && !multi) {
                    throw new InvalidMultiProviderError();
                }

                existing.push(provider);
                return;
            }
            
            if (existing.singleton) {
                throw new DuplicateProviderError();
            }

            throw new Error("Invalid provider configuration. Existing provider both 'singleton' and 'multi' is set to false. Set one to true");
        }

        if (type === "ExistingProvider") {
            if (!this.exists((options as ExistingProvider).useExisting)) {
                throw new ExistingProviderNotFoundError();
            }

            let alias = (options as ExistingProvider).useExisting;
            let providers = this.getProvider(alias);

            if (!providers) {
                throw new ExistingProviderNotFoundError();
            }

            this.injectables.set(token, providers);
            return;
        }

        if (multi) {
            this.injectables.set(token, [provider]);
            return;
        }

        this.injectables.set(token, provider);
    }

    private exists(token: Token): boolean {
        let parent = this.parent;
        let exists = this.has(token);

        if (exists) return true;
        
        do {
            if (parent?.has(token)) {
                exists = true;                
                break;
            }

            parent = (parent as Injector)?.parent;
        } while(parent !== undefined);

        return exists;
    }

    private getProvider(token: Token): ProviderFactory | ProviderFactory[] | undefined {
        let parent = this.parent;
        let provider!: ProviderFactory | ProviderFactory[] | undefined;

        if (isProxy(token)) {
            token = Reflect.getOwnMetadata("injectable", token).provide;
            provider = this.injectables.get(token);
        } else {
            provider = this.injectables.get(token);
        }

        if (provider) return provider;
        
        do {
            if (parent?.has(token)) {
                provider = (parent as Injector).injectables.get(token);
                break;
            }

            parent = (parent as Injector)?.parent;
        } while(parent !== undefined);

        return provider;
    }
}

export const injector = Injector.create();
export default injector;