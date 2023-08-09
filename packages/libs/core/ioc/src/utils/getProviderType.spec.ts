import { ClassProvider, ConstructorProvider, ValueProvider, FactoryProvider, Provider, ExistingProvider } from '../contracts';
import { getProviderType } from './getProviderType';
import { ProviderType } from '../types';


class A {}
class B {}

const classProvider: ClassProvider = { provide: A, useClass: A };
const ctorProvider: ConstructorProvider = { provide: B };
const valueProvider: ValueProvider = { provide: String, useValue: "Hello Value" };
const fnProvider: FactoryProvider = { provide: A , useFactory: () => {} }
const existingProvider: ExistingProvider = { provide: B, useExisting: A };

const providers: Array<{provider: Provider, expected: ProviderType}> = [
    { provider: classProvider, expected: 'ClassProvider' },
    { provider: ctorProvider, expected: 'ConstructorProvider' },
    { provider: valueProvider, expected: 'ValueProvider' },
    { provider: fnProvider, expected: 'FactoryProvider' },
    { provider: existingProvider, expected: 'ExistingProvider' }
];

describe('setType', () => {
    test.each(providers)('should return $expected', ({provider, expected}) => {
        expect(getProviderType(provider)).toBe(expected);
    });

    it('should return undefined when type is unknown', () => {
        expect(getProviderType({} as Provider)).toBeUndefined();
    });
});