import { Type } from "../contracts";


/**
 * Gets the constructor of the primitive value.
 * 
 * @since 1.0.0
 * 
 * @param {unknown} type - The primitive value.
 * @returns {Type} The constructor of the primitive value.
 */
export function getPrimitiveType(type: unknown): Type |  BigIntConstructor | SymbolConstructor | undefined | null {
    if (typeof type === 'string') {
        return String;
    }

    if (typeof type === 'symbol') {
        return Symbol;
    }

    if (typeof type === 'number') {
        return Number;
    }

    if (typeof type === 'boolean') {
        return Boolean;
    }

    if (typeof type === 'bigint') {
        return BigInt;
    }

    if (typeof type === "undefined") {
        return undefined;
    }

    if (typeof type === 'object') {
        if (type instanceof Array) {
            return Array;
        }

        if (type === null) {
            return null;
        }

        return Object;
    }
}