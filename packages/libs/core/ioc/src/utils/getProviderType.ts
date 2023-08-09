import { ClassProvider, ConstructorProvider, ExistingProvider, FactoryProvider, Provider, ValueProvider } from "../contracts";
import { ProviderType } from '../types';


export function getProviderType(provider: Provider): ProviderType | undefined {
    if ((provider as ClassProvider).useClass) {
        return "ClassProvider";
    }

    if ((provider as ExistingProvider).useExisting) {
        return "ExistingProvider";
    }

    if ((provider as FactoryProvider).useFactory) {
        return "FactoryProvider";
    }

    if ((provider as ValueProvider).useValue) {
        return "ValueProvider";
    }

    if ((provider as ConstructorProvider).provide instanceof Function) {
        return "ConstructorProvider";
    }
}

export default getProviderType;