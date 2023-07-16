import { Reflector, Type } from "../contracts"
import { UndefinedProviderFactoryError } from "../exception.ts";
import { injector as reflector } from "../Injector";
import { ProviderFactory } from "../ProviderFactory";
import { ProviderOptions } from "../types";
import { Injectable } from "./Injectable"

export const Service = <S = any>(providedIn?: Type<S>) => {
    return <T>(type: Type<T>): Type<T> => {
        let injector = reflector.create();
        let service = Injectable({ providedIn: injector })(type);
        let provider: ProviderFactory = Reflect.getOwnMetadata("injectable", service);
        let options: ProviderOptions<"ClassProvider" | "ConstructorProvider"> = provider.options;

        if (!providedIn) {
            new ProviderFactory(options, reflector);
            return service;
        }

        let container: Reflector = Reflect.getOwnMetadata("injectable", providedIn)?.injector;

        if (container === undefined) {
            throw new UndefinedProviderFactoryError();
        }
        
        new ProviderFactory(options, container);
        return service;
    }
}