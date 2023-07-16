import { Type } from "../contracts";

export const isPrimitive = (subject: Type): boolean => {
    if (subject.prototype instanceof String) {
        return true;
    }

    if (subject.prototype instanceof Symbol) {
        return true;
    }

    if (subject.prototype instanceof Number) {
        return true;
    }

    if (subject.prototype instanceof Boolean) {
        return true;
    }

    if (subject.prototype instanceof BigInt) {
        return true;
    }

    if (typeof subject === "undefined") {
        return true;
    }

    return false;
}