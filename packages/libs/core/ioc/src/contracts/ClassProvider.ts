import { Provider } from "./Provider";
import { Type } from "./Type";

export interface ClassProvider<T = any> extends Provider {
    useClass: Type<T>;
}