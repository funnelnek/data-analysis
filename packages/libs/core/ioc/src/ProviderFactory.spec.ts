import 'reflect-metadata';
import { jest } from '@jest/globals';
import { ClassProvider, ConstructorProvider, ExistingProvider, FactoryProvider, IProviderFactory, IReflection, Provider, Reflector, ValueProvider } from './contracts';
import { UnknownProviderType, UnresolvedDependenciesError } from './exception.ts';
import { ProviderType } from './types';


const getProviderType = jest.fn<(provider: Provider) => ProviderType | undefined>(() => undefined);
const dependencies = jest.fn<(type: IProviderFactory, i?: number, dependencies?: any[]) => IProviderFactory | undefined>((type) => type);
const register = jest.fn<(provider: IProviderFactory) => void>((provider: IProviderFactory) => undefined);
const Reflection = jest.fn<(type: any, injector: Reflector) => IReflection>();
const get = jest.fn<(token: any) => any>();

jest.unstable_mockModule('./Injector', () => ({
    __esModule: true,
    default: {},
    injector: {
        get,
        register
    }
}));
jest.unstable_mockModule('./utils/getProviderType', () => ({
    __esModule: true,
    default: getProviderType,
    getProviderType
}));
jest.unstable_mockModule('./utils/dependencies', () => ({
    __esModule: true,
    default: dependencies,
    dependencies
}));
jest.unstable_mockModule('./Reflection', () => ({
    __esModule: true,
    default: Reflection,
    Reflection
}));


class A {}
class B {}

const ClassProviderOptions: ClassProvider = { 
    provide: A, 
    useClass: A, 
    singleton: true,
    multi: false
};
const ConstructorProviderOptions: ConstructorProvider = { 
    provide: B, 
    singleton: true, 
    multi: false,
    deps: []
};
const ValueProviderOptions: ValueProvider = { 
    provide: String, 
    useValue: "Hello Value", 
    singleton: true, 
    multi: false 
};
const FactoryProviderOptions: FactoryProvider = { 
    provide: A, 
    useFactory: () => true, 
    singleton: true, 
    multi: false,
    deps: [] 
};
const ExistingProviderOptions: ExistingProvider = { 
    provide: A, 
    useExisting: B, 
    singleton: true, 
    multi: false 
};
const providers: Array<{provider: Provider, expected: IProviderFactory}> = [
    { 
        provider: ValueProviderOptions,
        expected: {
            provide: ValueProviderOptions.provide,
            type: "ValueProvider",
            options: ValueProviderOptions,
            multi: ValueProviderOptions.multi,
            singleton: ValueProviderOptions.singleton,
            implements: ValueProviderOptions.useValue
        }
    },
    { 
        provider: {...ValueProviderOptions, multi: undefined, singleton: undefined},
        expected: {
            provide: ValueProviderOptions.provide,
            type: "ValueProvider",
            options: ValueProviderOptions,
            multi: false,
            singleton: true,
            implements: ValueProviderOptions.useValue
        }
    },
    { 
        provider: {...ValueProviderOptions, multi: true, singleton: false},
        expected: {
            provide: ValueProviderOptions.provide,
            type: "ValueProvider",
            options: {...ValueProviderOptions, multi: true, singleton: false},
            multi: true,
            singleton: false,
            implements: ValueProviderOptions.useValue
        }
    },
    { 
        provider: ExistingProviderOptions, 
        expected: {
            provide: ExistingProviderOptions.provide,
            type: "ExistingProvider",
            options: ExistingProviderOptions,
            multi: ExistingProviderOptions.multi,
            singleton: ExistingProviderOptions.singleton,
            implements: ExistingProviderOptions.useExisting
        }
    },
    { 
        provider: ClassProviderOptions, 
        expected: {
            provide: ClassProviderOptions.provide,
            type: "ClassProvider",
            options: ClassProviderOptions,
            multi: ClassProviderOptions.multi,
            singleton: ClassProviderOptions.singleton,
            implements: ClassProviderOptions.useClass
        } 
    },
    { 
        provider: ConstructorProviderOptions, 
        expected: {
            provide: ConstructorProviderOptions.provide,
            type: "ConstructorProvider",
            options: ConstructorProviderOptions,
            multi: ConstructorProviderOptions.multi,
            singleton: ConstructorProviderOptions.singleton,
            implements: ConstructorProviderOptions.provide
        } 
    },
    { 
        provider: FactoryProviderOptions, 
        expected: {
            provide: FactoryProviderOptions.provide,
            type: "FactoryProvider",
            options: FactoryProviderOptions,
            multi: FactoryProviderOptions.multi,
            singleton: FactoryProviderOptions.singleton,
            implements: FactoryProviderOptions.useFactory()
        }
    }
];
const invalidProviderDependencies: Array<{ provider: ClassProvider|ConstructorProvider|FactoryProvider, type: Exclude<ProviderType, "ExistingProvider" | "ValueProvider">}> = [
    { provider: ClassProviderOptions, type: "ClassProvider" },
    { provider: {...FactoryProviderOptions, deps: [{}]}, type: "FactoryProvider" },
    { provider: {...ConstructorProviderOptions, deps: [{}]} as ConstructorProvider, type: "ConstructorProvider"},
]


const { injector } = await import('./Injector');
const { ProviderFactory } = await import('./ProviderFactory');

describe('ProviderFactory', () => {
    let getMetadata: jest.Spied<typeof Reflect.getMetadata>;
    let defineMetadata: jest.Spied<typeof Reflect.defineMetadata>;
    let getOwnMetadata: jest.Spied<typeof Reflect.getOwnMetadata>;

    beforeEach(() => {
        getMetadata = jest.spyOn(Reflect, 'getMetadata').mockImplementation(() => undefined);
        defineMetadata = jest.spyOn(Reflect, 'defineMetadata').mockImplementation(() => undefined);
        getOwnMetadata = jest.spyOn(Reflect, 'getOwnMetadata').mockImplementation(() => undefined);
        
        Reflection.mockImplementation((type: any, reflector: Reflector) => ({ type, reflector } as IReflection))
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    it('should throw UnknownProviderType when provider type is invalid', () => {
        expect(() => {
            new ProviderFactory({} as Provider);
        }).toThrow(UnknownProviderType);
    });

    test.each(invalidProviderDependencies)('should throw UnresolvedDependenciesError when $type contains dependencies that were unable to resolve to instanceof `ProviderFactory`', ({provider, type}) => {
        getProviderType.mockImplementationOnce(() => type);

        if (type === "ClassProvider") {
            getOwnMetadata.mockImplementationOnce((key: string) => {
                if (key === 'design:paramtypes') return [{}]
            });
        }

        expect(() => {
            new ProviderFactory(provider);
        }).toThrow(UnresolvedDependenciesError);

        if (type === "ClassProvider") {
            expect(getOwnMetadata).toBeCalledTimes(1);
            expect(getOwnMetadata).toBeCalledWith("design:paramtypes", provider.provide);
            expect(getOwnMetadata).toReturnWith([{}]);            
        }
    });

    test.each(providers)('should create a provider factory of type $expected.type', ({provider, expected}) => {
        let reflection = { type: provider.provide, reflector: injector } as IReflection;
        
        getProviderType.mockImplementationOnce(() => expected.type);

        let factory = new ProviderFactory(provider);
        
        expect(factory.deps).toEqual([]);       
        expect(factory.injector).toBe(injector);
        expect(factory.type).toBe(expected.type);
        expect(factory.multi).toBe(expected.multi);
        expect(factory.provide).toBe(expected.provide);
        expect(factory.options).toEqual(expected.options);
        expect(factory.singleton).toBe(expected.singleton);
        expect(register).toBeCalledTimes(1);
        expect(register).toBeCalledWith(factory);
        expect(dependencies).not.toBeCalled();

        if (expected.type === "ValueProvider") {
            expect(factory.implements).toBe(expected.implements)
        }

        if (expected.type === 'FactoryProvider') {
            expect(factory.implements).toBe(expected.implements);
        }
        
        if (expected.type === "ExistingProvider") {            
            let existing = (provider as ExistingProvider).useExisting;
            let existingReflection = { type: existing, reflector: injector };
            
            get.mockImplementationOnce(() => new existing());
            
            expect(factory.factory).toBe(expected.provide);
            expect(getMetadata).toBeCalledTimes(2);
            expect(getMetadata).nthCalledWith(1, 'reflection', provider.provide);
            expect(getMetadata).nthCalledWith(2, 'reflection', existing);
            expect(getMetadata).nthReturnedWith(1, undefined);
            expect(getMetadata).nthReturnedWith(2, undefined);
            expect(Reflection).toBeCalledTimes(2);
            expect(Reflection).nthCalledWith(1, provider.provide, injector);
            expect(Reflection).nthCalledWith(2, existing, injector);
            expect(Reflection).nthReturnedWith(1, reflection);
            expect(Reflection).nthReturnedWith(2, existingReflection);
            expect(defineMetadata).toBeCalledTimes(2);
            expect(defineMetadata).nthCalledWith(1, 'injectable', factory, provider.provide);
            expect(defineMetadata).nthCalledWith(2, 'reflection', existingReflection, provider.provide);
            expect(factory.implements).toBeInstanceOf(expected.implements);
        }

        if (expected.type === "ClassProvider") {
            expect(getOwnMetadata).toBeCalled();
            expect(getOwnMetadata).toBeCalledWith('design:paramtypes', (provider as ClassProvider).useClass);
        }
        
        if (expected.type === 'ClassProvider' || expected.type === 'ConstructorProvider') {
            expect(factory.factory).toBe(expected.provide);
            expect(getOwnMetadata).toHaveBeenLastCalledWith('reflection', provider.provide);
            expect(getOwnMetadata).toReturnWith(undefined);
            expect(Reflection).toBeCalledTimes(1);
            expect(Reflection).toBeCalledWith(provider.provide, injector);
            expect(Reflection).toReturnWith(reflection);
            expect(defineMetadata).toBeCalledTimes(1);
            expect(defineMetadata).toBeCalledWith('reflection', reflection, provider.provide);
            expect(factory.implements).toBeInstanceOf(expected.provide);
            (expected.type === 'ConstructorProvider') ? expect(getOwnMetadata).toBeCalledTimes(1) : expect(getOwnMetadata).toBeCalledTimes(2);
        }
    });
});