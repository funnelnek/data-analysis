import { Enumerable } from "@funnelnek/common";
export declare const Lazy: (isLazy?: boolean) => <T extends Enumerable<any>, K extends keyof T>(proto: T, property: string, descriptor?: TypedPropertyDescriptor<T[K]> | undefined) => void;
