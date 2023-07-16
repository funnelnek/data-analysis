import { Dependencies } from "./Dependencies";
import { Provider } from "./Provider";
import { ProviderContext } from "./ProviderContext";

export interface IProviderFactory<T = any, V = T> extends Provider<T>, ProviderContext<V>, Dependencies<IProviderFactory> {
}