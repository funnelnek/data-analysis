import "reflect-metadata";
import { Reflector, Type } from "../../../src/contracts";
import { Service } from "../../../src/decorators";
import { UndefinedProviderFactoryError } from "../../../src/exception.ts";
import injector from "../../../src/Injector";
import { ProviderFactory } from "../../../src/ProviderFactory";

class A {

}

class B {

}

class C {

}

class D {

}

describe("Service decorator", () => {
    let service: Type;
    let serviceB: Type;

    beforeAll(() => {
        service = Service()(A);
        serviceB = Service(service)(B);
    });

    it("should be registered with the parent container", () => {
        let provider: ProviderFactory = Reflect.getOwnMetadata("injectable", service);
        let providerB: ProviderFactory = Reflect.getOwnMetadata("injectable", serviceB);

        expect(provider.injector !== injector).toBe(true);
        expect(provider.injector.has(service)).toBe(true);
        expect(injector.has(service)).toBe(true);
        expect(providerB.injector !== provider.injector && providerB.injector !== injector).toBe(true);
        expect(providerB.injector.has(serviceB)).toBe(true);
        expect(provider.injector.has(serviceB)).toBe(true);
    });

    it("should throw UndefinedProviderFactoryError if 'providedIn' service does not contain injectable metadata", () => {
        expect(() => {
            Service(D)(C);
        }).toThrowError(UndefinedProviderFactoryError);
    });
});