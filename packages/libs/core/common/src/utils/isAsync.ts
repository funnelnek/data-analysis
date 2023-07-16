import { isObservable, Observable } from "rxjs";

export const isAsync = (subject: any): boolean => {
    if (subject instanceof Promise || subject.prototype instanceof Promise) {
        return true;
    }

    if (isObservable(subject)) {
        return true;
    }

    return false;
}