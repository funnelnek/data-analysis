import { Type } from "../contracts";

export const type = (type: Type) => {
    return (proto: object, property: string | symbol, decriptor?: TypedPropertyDescriptor<typeof type>): void => {
        Reflect.defineMetadata("design:type", type, proto, property);
    }
}