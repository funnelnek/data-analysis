import { Type } from "../contracts";

export const returns = (type: Type) => {
    return <T extends Function>(proto: object, property: string, _: TypedPropertyDescriptor<T>): void => {
        Reflect.defineMetadata("design:type", type, proto, property);
    }
}