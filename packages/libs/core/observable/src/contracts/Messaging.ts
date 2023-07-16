import { Observable } from "rxjs";
import { Supplier, Consumer, Runnable } from "@funnelnek/common";

export interface Messaging<T> {
    get: Supplier<Observable<T>>;
    send: Consumer<T>;
    unsubscribe(): Runnable;
}   