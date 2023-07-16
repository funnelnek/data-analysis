import { Type } from "../contracts";
import { ClassProvider } from "../contracts/ClassProvider";
import { ConstructorProvider } from "../contracts/ConstructorProvider";
import { ExistingProvider } from "../contracts/ExistingProvider";
import { FactoryProvider } from "../contracts/FactoryProvider";
import { ValueProvider } from "../contracts/ValueProvider";

export type ProviderToken = Type | ClassProvider | FactoryProvider | ConstructorProvider | ExistingProvider | ValueProvider;