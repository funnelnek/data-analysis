import { ExistingProvider, Reflector, Type } from "./contracts";
import { Token } from "./types";
import { InjectionToken } from "./InjectionToken";
import { ProviderFactory } from "./ProviderFactory";
import { ExistingProviderNotFoundError, InjectableNotFoundError, InvalidMultiProviderError, InvalidProviderFactoryError, UndefinedProviderFactoryError } from "./exception.ts";
import { DuplicateProviderError } from "./exception.ts/DuplicateProviderError";
import { isProxy } from "./utils";


/**
 * A Reflector implementation.
 *
 * @remarks
 * This is the default implementation of the Reflector API and the root container.  
 * It's a container which injectables are registered.
 * 
 * > There's no direct access to this class which can be extended as only the instance is exported.
 * 
 * @since 1.0.0
 * 
 * @see Reflector 
 * @interal
 */
class Injector implements Reflector {
    /**
     * A set of created injectors.
     * @internal @private
     */
    static #injectors: Set<Reflector> = new Set<Reflector>();
    /**
     * An instance of the singleton injector.
     * @internal @private
     */
    static #instance: Reflector;

    /**
     * The singleton instance.
     * @internal
     */
    static get instance(): Reflector {
        return Injector.#instance;
    }
    /**
     * Creates a new injector instance.
     * @param parent - The parent reflector.
     * @returns A new reflector instance.
     */
    static create(parent?: Reflector): Reflector {
        let injector = new Injector(parent ?? Injector.#instance);
        Injector.#injectors.add(injector);

        return injector;
    }
    /**
     * A map of registered injectables into this container.
     */
    protected injectables = new Map<Token, ProviderFactory| ProviderFactory[]>();
    /**
     * The parent injector.
     * @protected @readonly
     */
    protected readonly parent: Reflector | undefined;


    /**
     * The Injector constructor method.
     * @param {Reflector} parent - The parent reflector.
     */
    protected constructor(parent?: Reflector) {
        if (Injector.#instance === undefined) {            
            Injector.#instance = this;
        }

        if (parent) {
            this.parent = parent;
        }
    }


    /**
     * Creates a new injector instance.
     * @param parent - The parent reflector.
     * @returns {Reflector} A new injector instance.
     */
    create(parent?: Reflector): Reflector {
        return Injector.create(parent);
    }
    /**
     * 
     * @param injectable 
     */
    get<T = any>(injectable: Type<T>): T;
    /**
     * 
     * @param injectable 
     */
    get<T = any>(injectable: InjectionToken<T>): T;
    /**
     * 
     * @param injectable 
     */
    get<T = any>(injectable: T): T;
    /**
     * @param {unknown} token - description
     * 
     * @throws InjectableNotFoundError
     */
    get(token: unknown): any {
        let provider = this.getProvider(token);
        
        if (provider === undefined) {
            throw new InjectableNotFoundError("Injectable was not found");
        }
        
        if (provider instanceof Array) {
            return provider.map(injectable => injectable.implements);
        }

        return provider.implements;
    }
    /**
     * Checks if the injectable is registered.
     * 
     * @example
     *
     * ```ts
     * @Injectable()
     * class MyService {}
     * 
     * var token = new InjectionToken('Token');
     * 
     * injector.has(MyService) // true
     * injector.has(token) // true
     * ```
     * 
     * @since 1.0.0
     * 
     * 
     * @param {any} injectable - The injectable.
     * @returns {boolean} `true` if the injectable is registered. Otherwise `false`.
     */
    has(injectable: any): boolean {        
        if(isProxy(injectable)) {
            let provider = Reflect.getOwnMetadata("injectable", injectable);
            return this.injectables.has(provider.provide);
        }

        return this.injectables.has(injectable);
    }
    /**
     * Register an injectable into the service container.
     * 
     * @remarks
     * This method is called internally when you create a `new ProviderFactory(options)` so you wouldn't call this method directly. 
     * 
     * Simply create a `new ProviderFactory(options)`.
     * 
     *
     * @param {ProviderFactory} provider - The `ProviderFactory` to register in the service container.
     * @returns {void}
     * 
     * @throws `UndefinedProviderFactoryError` when provider is `undefined`.
     * @throws `InvalidProviderFactoryError` when provider is not an instanceof `ProviderFactory`.
     * 
     * @internal
     */
    register(provider: ProviderFactory): void {
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
                if (!multi) {
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

    /**
     * Checks if the token exists in this container.
     * @param {Token} token - The token check for.
     * @return {boolean} - `true` if the token exists. Otherwise `false`.
     */
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

    /**
     * Gets the provider factory for the token.
     * @param {Token} - The token associated with the provider factory.
     * @return {ProviderFactory | ProviderFactory[] | undefined} - `undefined` if no provider factory was found. 
     * An array of provider factories if provider `multi` is set to true. Otherwise a single provider factory.
     */
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