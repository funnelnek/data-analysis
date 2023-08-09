import { getPrimitiveType } from './getPrimitiveType';

const values = [
    { value: 'Hello World', expected: String },
    { value: 100, expected: Number },
    { value: Symbol('my-symbol'), expected: Symbol },
    { value: true, expected: Boolean },
    { value: false, expected: Boolean },
    { value: [true, false], expected: Array },
    { value: undefined, expected: undefined },
    { value: null, expected: null },
];

describe('getPrimitiveType', () => {
    test.each(values)('The value $value should return $expected', ({value, expected}) => {
        expect(getPrimitiveType(value)).toBe(expected);
    });
});