import { IProviderFactory } from ".";
import { Dependencies } from "./Dependencies";
import { Provider } from "./Provider";
import { Type } from "./Type";


export interface ConstructorProvider<T = any> extends Provider<Type<T>>, Dependencies<IProviderFactory> {
    provide: Type<T>;
}