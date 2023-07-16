import { Type } from "./Type";

export interface SingletonProviderFactory<T extends Type = any> extends ProxyHandler<T> {
}