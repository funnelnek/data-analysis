import { isAsync } from "@funnelnek/common";
import { isObservable, Subject } from "rxjs";


export const next = (stream: Subject<any>, value: any): void => {
    if (!isAsync(value)) {
        stream.next(value);
    }

    if (isObservable(value)) {
        value.subscribe(stream);
    }

    if (value instanceof Promise) {
        value.then(stream.next);
    }
}