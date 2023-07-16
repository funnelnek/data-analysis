import { Dependencies } from "./Dependencies";
import { Provider } from "./Provider";

export interface FactoryProvider<T = any, D extends any = any> extends Provider<T>, Dependencies<D> {
    useFactory: Function;
}