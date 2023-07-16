import { isPrimitive } from "./isPrimitive"

export const shouldReturnToken = (subject: any): boolean => {
    if (
        isPrimitive(subject) ||
        subject instanceof Date ||
        subject instanceof Map ||
        subject instanceof WeakMap ||
        subject instanceof Set ||
        subject instanceof WeakSet
    ) {
        return true;
    }

    return false;
}