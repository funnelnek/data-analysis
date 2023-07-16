import { Routing } from "../contracts";
import { TemplateOptions } from "../contracts/TemplateOptions";
export declare const Outlet: (options?: TemplateOptions) => <T extends Routing, K extends "element" | "Component">(prototype: T, property: K, descriptor?: TypedPropertyDescriptor<T[K]> | undefined) => void;
