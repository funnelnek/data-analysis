/**
 * Generic constructor class
 */
export interface Type<T extends {} = {}> extends Function {
    /**
     * The constructor method.
     * @param args - The constructor parameters.
     * @returns {T} - The class instance type.
     */
    new (...args: any[]): T;
    /**
     * The class prototype.
     */
    prototype: T;
}