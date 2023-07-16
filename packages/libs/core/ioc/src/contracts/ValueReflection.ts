import { IReflection } from "./IReflection";
import { Type } from "./Type";

export interface ValueReflection extends IReflection {
    dataType: Type<any>;
}