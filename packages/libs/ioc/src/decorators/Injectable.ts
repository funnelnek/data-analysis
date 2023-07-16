import { ClassProvider, ConstructorProvider, Reflector, Type } from "../contracts";
import { InjectableOptions } from "../contracts/InjectableOptions";
import { DefaultInjectableOptions } from "../DefaultInjectableOptions";
import { injector as reflector } from "../Injector";
import { ProviderFactory } from "../ProviderFactory";
import { Reflection } from "../Reflection";
import { SingletonClassProvider } from "../SingletonClassProvider";
import { ProviderOptions } from "../types";
import { isProxy } from "../utils";
import { dependencies as providers } from "../utils/dependencies";


export const Injectable = (options: InjectableOptions = DefaultInjectableOptions) => {
    const { alias, provides, multi = false, providedIn: injector = reflector, singleton = true } = options;

    let providedIn!: Reflector;

    if (injector instanceof Function) {
        let reflection: Reflection = Reflect.getOwnMetadata("reflection", injector);
        
        if (!reflection) {
            throw new Error("Unable to reflect 'providedIn' container");
        }

        providedIn = reflection.reflector;
    } else {
        providedIn = injector;
    }


    return <T extends Type>(type: T): T => {
        let factory!: T;
        let proxy: boolean = isProxy(type);
        let reflection = !proxy ? new Reflection(type, providedIn) : Reflect.getOwnMetadata("reflection", type);
        let parameters: any[] = Reflect.getOwnMetadata("design:paramtypes", type) ?? [];
        let dependencies = parameters.map(providers);
        let provider: ProviderFactory = Reflect.getOwnMetadata("injectable", type);
        
        if (!provider) {
            factory = new Proxy(type, new SingletonClassProvider());
        } else {
            factory = provider.factory;
        }

        Reflect.defineMetadata("reflection", reflection, factory);

        let config: ProviderOptions<"ClassProvider" | "ConstructorProvider"> = { provide: factory, multi, singleton }; 

        if (provides) {
            if (!multi) {
                throw new Error("Must set multi to true when setting 'provides' option.");
            }

            config = {
                ...config,
                provide: provides,
                useClass: factory
            } as ClassProvider;
                
            provider = new ProviderFactory(config, providedIn);
        }

        if (!provider) {           
            (config as ConstructorProvider).deps = dependencies as ProviderFactory[];;
            provider = new ProviderFactory(config, providedIn);
        }
        
        Reflect.defineMetadata("injectable", provider, factory);

        if (alias) {
            Reflect.defineMetadata("injectable", provider, alias);
            Reflect.defineMetadata("reflection", reflection, alias);

            let aliasOptions: ProviderOptions<"ExistingProvider"> = { provide: alias, useExisting: factory, multi, singleton };
            new ProviderFactory(aliasOptions, providedIn);
        }
        
        return factory;
    }   
}