import { ClassProvider, ConstructorProvider, ExistingProvider, FactoryProvider, ValueProvider } from "../contracts";
import { ProviderType } from "./ProviderType";


export type ProviderOptions<T extends ProviderType> = T extends "ValueProvider" ? ValueProvider : T extends "ClassProvider" ? ClassProvider : T extends "ConstructorProvider" ? ConstructorProvider : T extends "FactoryProvider" ? FactoryProvider : T extends "ExistingProvider" ? ExistingProvider : never;