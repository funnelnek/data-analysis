import { ProviderFactory } from "../ProviderFactory";

export const dependencies = (type: object, i?: number, dependencies?: any[]): ProviderFactory | undefined => {
    return Reflect.getMetadata("injectable", type);
}