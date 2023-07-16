import type { ClassProvider, ConstructorProvider, ExistingProvider, FactoryProvider, Reflector, Type, ValueProvider } from "./contracts";
import { Service } from "./decorators";
import { InjectionToken } from "./InjectionToken";
import { injector as defaultInjector } from "./Injector";
import { ProviderFactory } from "./ProviderFactory";
import { ProviderOptions, ProviderType } from "./types";


@Service()
export class ServiceProvider implements Reflector {
    constructor(private injector: Reflector = defaultInjector) {
    }

    create(parent?: Reflector | undefined): Reflector {
        return this.injector.create(parent);
    }

    has(injectable: any): boolean {
       return this.injector.has(injectable);
    }

    get<T = any>(injectable: Type<T>): T;
    get<T = any>(injectable: InjectionToken<T>): T;
    get<T extends unknown = any>(injectable: T): any {
        return this.injector.get(injectable);
    }

    register(provider: FactoryProvider): void;
    register(provider: ExistingProvider): void;
    register(provider: ConstructorProvider): void;
    register(provider: ClassProvider): void;
    register(provider: ValueProvider): void;
    register(provider: ProviderOptions<ProviderType>): void {
        const { injector } = this;
        injector.register(new ProviderFactory(provider, injector));
    }
}