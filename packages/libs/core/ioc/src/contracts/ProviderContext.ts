import { ProviderType } from "../types";
import { ProviderOptions } from "../types/ProviderOptions";


export interface ProviderContext<T = any> {
    type: ProviderType;
    options: ProviderOptions<ProviderType>;
    implements: T;
}