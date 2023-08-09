import { injector as reflector } from "./Injector";
import { Reflection } from "./Reflection";
import { ProviderOptions, ProviderType } from "./types";
import { getProviderType, dependencies } from "./utils";
import { UnknownProviderType, UnresolvedDependenciesError,  } from "./exception.ts";
import { 
    ClassProvider, 
    ConstructorProvider, 
    ExistingProvider, 
    FactoryProvider, 
    Provider, 
    Reflector, 
    ValueProvider, 
    IProviderFactory 
} from "./contracts";



/**
 * The provider factory describes how the injectable should be configured and registered to the injector. 
 * 
 * @remarks
 * The provider factory configures and then registered itself with the injector. 
 * It stores all the information needed to resolve the injectable. Once the injectable has been instantiated it is cache inside the provider factory and return this instance of the injectable when requested.   
 * 
 * 
 * @since 1.0.0 
 * 
 * @typeParam T - The provider type.
 * @typeParam V - The provider value type.
 */
export class ProviderFactory<T = any, V = T> implements IProviderFactory<T,V> {
    protected _deps!: ProviderFactory[];
    protected _implements!: V;
    protected _provide: T;
    protected _type!: ProviderType;
    protected _multi: boolean = false;
    protected _singleton: boolean = true;
    protected _options: ProviderOptions<ProviderType>;
    protected _instance!: V;
    protected _factory!: T;

    /**
     * Create a new provider factory
     * @param {FactoryProvider} provider - The FactoryProvider to register inside the injector container.
     * @param {Reflector} injector - The injector container.
     * @overload
     */
    constructor(provider: FactoryProvider, injector?: Reflector);
    /**
     * Create a new provider factory
     * @param {ExistingProvider} provider - The ExistingProvider to register inside the injector container.
     * @param {Reflector} injector - The injector container.
     * @overload
     */
    constructor(provider: ExistingProvider, injector?: Reflector);
     /**
     * Create a new provider factory
     * @param {ConstructorProvider} provider - The ConstructorProvider to register inside the injector container.
     * @param {Reflector} injector - The injector container.
     * @overload
     */
    constructor(provider: ConstructorProvider, injector?: Reflector);
    /**
     * Create a new provider factory
     * @param {ClassProvider} provider - The ClassProvider to register inside the injector container.
     * @param {Reflector} injector - The injector container.
     * @overload
     */
    constructor(provider: ClassProvider, injector?: Reflector);
    /**
     * Create a new provider factory
     * @param {ValueProvider} provider - The ValueProvider to register inside the injector container.
     * @param {Reflector} injector - The injector container.
     * @overload
     */
    constructor(provider: ValueProvider, injector?: Reflector);
    /**
     * Create a new provider factory
     * @param {Provider} provider - The Provider to register inside the injector container.
     * @param {Reflector} _injector - The injector container.
     */
    constructor (provider: Provider, protected _injector: Reflector = reflector) {
        let type = this.setType(provider);

        if (!type) {
            throw new UnknownProviderType("Unknown provider type");
        }

        this.deps = 'deps' in provider ? provider.deps as ProviderFactory[] : [];
        this._provide = provider.provide;
        this._multi = provider.multi ?? false;
        this._singleton = provider.singleton ?? true;
        this._options = {...provider, multi: this._multi, singleton: this._singleton};
        
        if (type === "ValueProvider") {
            this._instance = (provider as ValueProvider).useValue;
        }

        if (type === "ExistingProvider") {
            let existing = (provider as ExistingProvider).useExisting;
            let aliasReflection = Reflect.getMetadata("reflection", provider.provide);
            let existingReflection = Reflect.getMetadata("reflection", existing);

            if (aliasReflection === undefined) {
                aliasReflection = new Reflection(provider.provide, _injector);
            }

            if (existingReflection === undefined) {
                existingReflection = new Reflection(existing, _injector);
            }

            if (aliasReflection.type !== existingReflection.type) {
                Reflect.defineMetadata("injectable", this, provider.provide);
                Reflect.defineMetadata("reflection", existingReflection, provider.provide);
            }

            this._provide = provider.provide;
            this._factory = provider.provide;
        }

        if (type === "ClassProvider") {
            let provide = (provider as ClassProvider).useClass;
            let params = Reflect.getOwnMetadata("design:paramtypes", provide) ?? [];
            let deps: ProviderFactory[] = params.map(dependencies);

            if (!deps.every(d => d instanceof ProviderFactory)) {
                throw new UnresolvedDependenciesError("Unable resolve provider dependencies");
            }
            
            this._deps = deps;
        }

        if (type === "ClassProvider" ||  type === "ConstructorProvider") {
            let reflection: Reflection = Reflect.getOwnMetadata("reflection", provider.provide);

            if (reflection === undefined) {
                reflection = new Reflection(provider.provide, _injector);
                
                Reflect.defineMetadata("reflection", reflection, provider.provide);
            }

            this._provide = provider.provide;
            this._factory = provider.provide;
        }

        _injector.register(this);
    }

    get multi(): boolean {
        return this._multi;
    }

    get singleton(): boolean {
        return this._singleton;
    }

    get factory(): T {
        return this._factory;
    }

    get options(): ProviderOptions<ProviderType> {
        return this._options;
    }

    get implements(): V {
        let { _instance, _singleton } = this;

        if (_instance && _singleton) {
            return _instance;
        }

        return this.resolve();
    }

    get injector(): Reflector {
        return this._injector;
    }

    get type(): ProviderType {
        return this._type;
    }

    get provide(): any {
        return this._provide;
    }

    get deps(): ProviderFactory[] {
        return this._deps;
    }

    set deps(value: ProviderFactory[]) {
        let deps = this._deps = value.map(dependencies) as ProviderFactory[];

        if (!deps.every(d => d instanceof ProviderFactory)) {
            throw new UnresolvedDependenciesError("Unable resolve provider dependencies");
        }
    }

    set options(value: ProviderOptions<ProviderType>) {
        this._options = value;
    }

    protected resolve(): V {
        let dependencies = this.deps.map(provider => provider.implements);
        let instance: V;

        switch (this.type) {            
            case "ClassProvider":
                instance = new (this.options as ClassProvider).useClass(...dependencies);
                break;
            case "FactoryProvider":
                instance = (this.options as FactoryProvider).useFactory(...dependencies);
                break;
            case "ConstructorProvider":
                instance = new (this.options as ConstructorProvider).provide(...dependencies);
                break;            
            case "ExistingProvider":
                instance = this._injector.get(this.options.provide);
                break;
            case "ValueProvider":
                instance = (this.options as ValueProvider).useValue;
                break;
        }

        if (instance === undefined) {
            throw new Error("ProviderFactory failed to resolve implementation.");            
        }
        
        return this._instance = instance;
    }

    /**
     * @param {Provider} provider - The provider to detect and set `_type`.
     */
    private setType(provider: Provider): ProviderType | undefined {
        let type = getProviderType(provider);

        if (type) this._type = type;
        return type;
    }
}

export default ProviderFactory;