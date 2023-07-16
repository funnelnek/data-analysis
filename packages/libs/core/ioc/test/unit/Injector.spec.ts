import "reflect-metadata";

import { ExistingProvider, Reflector } from "../../src/contracts";
import { DuplicateProviderError, ExistingProviderNotFoundError, InvalidMultiProviderError, InvalidProviderFactoryError, UndefinedProviderFactoryError } from "../../src/exception.ts";
import { InjectionToken } from "../../src/InjectionToken";
import injector from "../../src/Injector";
import { ProviderFactory } from "../../src/ProviderFactory";

const HELLO_WORLD = new InjectionToken("Hello World");
const MULTI_TOKEN = new InjectionToken("MULTI_TOKEN", true);

class A {}
class B {}

describe("injector", () => {
    beforeAll(() => {
        
    });

    it("should be an instance of Injector", () => {
        expect(injector).toBeDefined();
        expect(injector.constructor.name).toBe("Injector");
    });

    describe("injector.create", () => {
        describe("injector.create()", () => {
            let instance: Reflector;
    
            beforeEach(() => {
                instance = injector.create();            
            });
    
            it("should create a new instance", () => {
                expect(instance).toBeDefined();
                expect(instance.constructor.name).toBe("Injector");
                expect(instance).not.toEqual(injector);
            });
        });

        describe("injector.create(parent)", () => {
            let instance = injector.create();

            it("should accept a parent injector.", () => {
                let child = injector.create(instance);

                expect(child).toBeDefined();
                expect(child.constructor.name).toBe("Injector");
            })
        });
    });

    describe("injector.register", () => {
        describe("injector.register()", () => {
            it("should throw UndefinedProviderFactoryError when no argument is given", () => {
                expect(() => {
                    injector.register(undefined!);
                }).toThrowError(UndefinedProviderFactoryError)
            });        
        });
    
        describe("injector.register(providerFactory)", () => {            
            let has: jest.SpyInstance<boolean, [injectable: any], any>;
    
            beforeAll(() => {
                has = jest.spyOn(injector, "has");
            });
    
            afterAll(() => {
                has.mockRestore();
            });
    
            it("should throw InvalidProviderFactoryError if argument is not an instance of ProviderFactory", () => {
                expect(() => {
                    injector.register({} as unknown as ProviderFactory);
                }).toThrowError(InvalidProviderFactoryError);
            });
    
            it("should take an instance of ProviderFactory as its only argument", () => {
                expect(() => {
                    new ProviderFactory({ provide: A, useClass: A });
                }).not.toThrowError(InvalidProviderFactoryError);
            });
    
            it("should first check to see if it has the token id", () => {
                let token = new InjectionToken("NEW TOKEN");
                expect(has).toBeCalled();
                expect(has).toBeCalledWith(token);
            });

            it("should throw ExistingProviderNotFoundError if the provider factory is configured as ExistingProvider and the existing provider does not exists.", () => {
                let existingConfig = {
                    provide: {name: "Existing"},
                    useExisting: B
                } as ExistingProvider;
                
                expect(() => {
                    let provider = new ProviderFactory(existingConfig);                    
                }).toThrowError(ExistingProviderNotFoundError);
            });

            it("should throw DuplicateProviderError if an existing token exists and the provider is not set to singleton=false", () => {
                expect(() => {
                    new ProviderFactory({ provide: HELLO_WORLD, useValue: "Hello World Again"})
                }).toThrowError(DuplicateProviderError);
            });

            it("should throw DuplicateProviderError if an existing token exists and the provider is not set to multi=false", () => {
                expect(() => {
                    new ProviderFactory({ provide: MULTI_TOKEN, useValue: "ksofk" });
                }).toThrowError(InvalidMultiProviderError);
            });

            it("should allow multiple values for a multi provider when 'multi' is set to true", () => {
                let multi = new ProviderFactory({ provide: MULTI_TOKEN, useValue: "KSDF", multi: true });
                let results = injector.get(MULTI_TOKEN);

                expect(results).toBeTruthy();
                expect(results).toBeInstanceOf(Array);
                expect(results.length).toBe(2);
            });

            it("should use existing provider if it exists", () => {
                class C {}

                new ProviderFactory({ provide: C,  useClass: C });
                let alias = new ProviderFactory({ provide: A, useExisting: C });
                let instance = injector.get(C);
                let aliasInstance = injector.get(A);
                let aliasProvider = Reflect.getOwnMetadata("injectable", A);

                expect(instance === aliasInstance).toBe(true);
                expect(alias === aliasProvider).toBe(true);
            });
        });
    });

    describe("injector.has", () => {
        it("should return true if token id already exists.", () => {
            expect(injector.has(HELLO_WORLD)).toBe(true);
        });

        it("should return false if token id does not exists", () => {
            expect(injector.has({})).toBe(false);
        });
    });
});