import "reflect-metadata";
import { jest } from '@jest/globals';
import { ClassProvider, IProviderFactory, Provider, Reflector } from "./contracts";
import { UndefinedProviderFactoryError, InvalidProviderFactoryError, InjectableNotFoundError, ExistingProviderNotFoundError } from "./exception.ts";


const MockProviderFactoryOptions: IProviderFactory = {
    provide: {},
    multi: false,
    type: 'ClassProvider',
    implements: {},
    options: {} as ClassProvider    
};
function ProviderFactoryImpl(provider: Provider): IProviderFactory {
    return MockProviderFactoryOptions;
}
Object.defineProperty(ProviderFactoryImpl, Symbol.hasInstance, {
    value(instance: any) {
      return true;
    },
});

const mockIsProxy = jest.fn(() => false);
const MockProviderFactory = jest.fn<(provider: Provider) => IProviderFactory>(ProviderFactoryImpl);
const MockInjectionToken = jest.fn(() => function(){});

jest.unstable_mockModule('./utils/isProxy', () => ({
    __esModule: true,
    isProxy: mockIsProxy
}));

jest.unstable_mockModule('./ProviderFactory', () => ({
    __esModule: true,
    ProviderFactory: MockProviderFactory
}));

jest.unstable_mockModule('./InjectionToken', () => ({
    __esModule: true,
    InjectionToken: MockInjectionToken
}));

const { injector } = await import("./Injector");


const defineMetadata = jest.spyOn(Reflect, 'defineMetadata');
const getMetadata = jest.spyOn(Reflect, 'getMetadata');
const getOwnMetadata = jest.spyOn(Reflect, 'getOwnMetadata');


describe("injector", () => {
    let has: jest.Spied<(injectable: any) => boolean>;
    let get: jest.Spied<(injectable: any) => any>;
        
    beforeAll(() => {
        has = jest.spyOn(injector, "has");
        get = jest.spyOn(injector, "get");
    });

    beforeEach(() => {
        MockProviderFactory.mockImplementation(() => MockProviderFactoryOptions);
        defineMetadata.mockImplementation(() => {});
        getMetadata.mockImplementation(() => {});
    });

    afterEach(() => {
        has.mockRestore();
        defineMetadata.mockRestore();
        getMetadata.mockRestore();
        MockProviderFactory.mockReset();
        MockInjectionToken.mockReset();
    });


    it("should be an instance of Injector", () => {
        expect(injector).toBeDefined();
        expect(injector.constructor.name).toBe("Injector");
    });
    /**
     * create method
     */
    describe("injector.create method", () => {
        let instance: Reflector;

        beforeEach(() => {
            instance = injector.create();
        });

        it("should create a new instance", () => {
            expect(instance).toBeDefined();
            expect(instance.constructor.name).toBe("Injector");
            expect(instance).not.toEqual(injector);
        });

        it("should accept a parent injector.", () => {
            let child = injector.create(instance);

            expect(child).toBeDefined();
            expect(child.constructor.name).toBe("Injector");
            expect(child).not.toEqual(injector);
            expect(child).not.toEqual(instance);
        });
    });
    /**
     * register method
     */
    describe("injector.register method", () => {
        it("should throw UndefinedProviderFactoryError when no argument is given.", () => {
            expect(() => {
                injector.register(undefined!);
            }).toThrowError(UndefinedProviderFactoryError);
        });

        it("should throw InvalidProviderFactoryError if argument is not an instance of ProviderFactory.", () => {
            expect(() => {
                injector.register({} as unknown as IProviderFactory);
            }).toThrowError(InvalidProviderFactoryError);
        });
    });
    /**
     * has method
     */
    describe("injector.has", () => {
        it("should return false if token id does not exists", () => {
            getOwnMetadata.mockImplementationOnce(() => ({ provide: {} }));
            mockIsProxy.mockImplementationOnce(() => true);

            expect(injector.has({})).toBe(false);

            mockIsProxy.mockImplementationOnce(() => false);
            expect(injector.has({})).toBe(false);
        });
    });  
    /**
     * get method
     */
    describe('injector.get', () => {
        it('should throw InjectableNotFoundError if the injectable does not exists', () => {
            let method = () => {
                injector.get({});
            }

            expect(method).toThrow(InjectableNotFoundError);
        });
    });
});