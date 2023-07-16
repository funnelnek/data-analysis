import { Injectable } from "@nestjs/common";
import { ClassProvider, ConstructorProvider, ExistingProvider, FactoryProvider, Provider, Reflector, Type, ValueProvider } from "./contracts";
import { IProviderFactory } from "./contracts/IProviderFactory";
import { injector as reflector } from "./Injector";
import { Reflection } from "./Reflection";
import { ProviderOptions, ProviderType } from "./types";
import { dependencies } from "./utils/dependencies";

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

    constructor(provider: FactoryProvider, injector?: Reflector);
    constructor(provider: ExistingProvider, injector?: Reflector);
    constructor(provider: ConstructorProvider, injector?: Reflector);
    constructor(provider: ClassProvider, injector?: Reflector);
    constructor(provider: ValueProvider, injector?: Reflector);
    constructor (provider: Provider, protected _injector: Reflector = reflector) {
        let type = this.setType(provider);

        if (!type) {
            throw new Error("Unknown provider type");
        }

        this._provide = provider.provide;
        this._multi = provider.multi ?? false;
        this._singleton = provider.singleton ?? true;
        this._options = provider;
        
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

            this._provide = aliasReflection.type;
            this._factory = provider.provide;
        }

        if (type === "ClassProvider") {
            let provide = (provider as ClassProvider).useClass;
            let params = Reflect.getOwnMetadata("design:paramtypes", provide) ?? [];
            let deps: ProviderFactory[] = params.map(dependencies);

            if (!deps.every(d => d instanceof ProviderFactory)) {
                throw new Error("Unable resolve provider dependencies");
            }          
            
            this._deps = deps;
        }

        if (type ===  "ConstructorProvider") {
            let deps: ProviderFactory[] = (provider as ConstructorProvider).deps as ProviderFactory[];

            if (!deps.every(d => d instanceof ProviderFactory)) {
                throw new Error("Unable resolve provider dependencies");
            }

            this._deps = deps;
        }

        if (type === "FactoryProvider") {
            let deps: ProviderFactory[] = (provider as FactoryProvider).deps as ProviderFactory[];

            if (!deps.every(d => d instanceof ProviderFactory)) {
                throw new Error("Unable resolve provider dependencies");
            }

            this._deps = deps;
        }

        if (type === "ClassProvider" ||  type === "ConstructorProvider") {
            let reflection: Reflection = Reflect.getOwnMetadata("reflection", provider.provide);

            if (reflection === undefined) {
                reflection = new Reflection(provider.provide, _injector);
                
                Reflect.defineMetadata("reflection", reflection, provider.provide);
            }

            this._provide = reflection.type as T;
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
        this._deps = value;
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

    protected setType(provider: Provider): ProviderType | undefined {
        if ((provider as ClassProvider).useClass) {
            return this._type = "ClassProvider";
        }

        if ((provider as ExistingProvider).useExisting) {
            return this._type = "ExistingProvider";
        }

        if ((provider as FactoryProvider).useFactory) {
            return this._type = "FactoryProvider";
        }

        if ((provider as ValueProvider).useValue) {
            return this._type = "ValueProvider";
        }

        if ((provider as ConstructorProvider).provide instanceof Function) {
            return this._type = "ConstructorProvider";
        }
    }
}