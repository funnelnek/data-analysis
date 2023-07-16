import "reflect-metadata";
import { Reflector, Type } from "../../../src/contracts";
import { Injectable } from "../../../src/decorators";
import { ProviderFactory } from "../../../src/ProviderFactory";
import { Reflection } from "../../../src/Reflection";
import { DefaultInjectableOptions } from "../../../src/DefaultInjectableOptions";
import injector from "../../../src/Injector";

class A {}

describe("Injectable", () => {
    let type: Type<A>;
    let reflection: Reflection;
    let provider: ProviderFactory;
    let getMetadataSpy: jest.SpyInstance;
    let defineMetadataSpy: jest.SpyInstance;
    let service: Reflector = injector.create();
    let serviceProvider: ProviderFactory;
    
    beforeAll(() => {
        type = Injectable()(A)
        serviceProvider = new ProviderFactory({ provide: type, useClass: type }, service);
    });

    it("should register Type with injector", () => {
        expect(injector.has(type)).toBe(true);
    });

    it("should to able to an instance of type once registered", () => {
        let instance = injector.get(type);
        
        expect(instance).toBeDefined();
        expect(instance).toBeInstanceOf(A);
    });

    it("should instantiate a single instance for singleton class provider", () => {
        let instance = injector.get(type);
        let serviceInstance = service.get(type);

        expect(service.has(type)).toBe(true);
        expect(injector.has(type)).toBe(true);
        expect(instance).toEqual(serviceInstance);
        expect(service).not.toEqual(injector);
        expect(instance === serviceInstance).toBe(true)
    });

    describe("InjectableOptions", () => {
        beforeEach(() => {
            getMetadataSpy = jest.spyOn(Reflect, "getOwnMetadata");
            defineMetadataSpy = jest.spyOn(Reflect, "defineMetadata");
        });
    
        afterEach(() => {
            getMetadataSpy.mockRestore();
            defineMetadataSpy.mockRestore();
        });

        it("should use the default injector if 'providedIn' is not set", () => {
            let reflector = Reflect.getOwnMetadata("reflection", type);
            expect(reflector.reflector).toEqual(injector);;
        });

        it("should set 'multi' to false set by default", () => {
            let provider: ProviderFactory = Reflect.getOwnMetadata("injectable", type);

            expect(provider.multi).toBe(false);
        });

        it("should set 'singleton' to true set by default", () => {
            let provider: ProviderFactory = Reflect.getOwnMetadata("injectable", type);

            expect(provider.singleton).toBe(true);
        });
    });    
});
