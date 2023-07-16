import { Reflector, ValueProvider } from "./contracts";
import { injector as reflector } from "./Injector";
import { ProviderFactory } from "./ProviderFactory";
import { Reflection } from "./Reflection";


export class InjectionToken<T = any> {
    constructor(value: T, multi: boolean = false, injector: Reflector = reflector) {
        const config = {
            multi,
            provide: this,
            useValue: value
        } as ValueProvider;

        const reflection = new Reflection(value, injector);
        const provider = new ProviderFactory(config, injector);

        Reflect.defineMetadata("injectable", provider, this);
        Reflect.defineMetadata("reflection", reflection, this);
        Reflect.defineMetadata("reflection", reflection, provider);
    }
}