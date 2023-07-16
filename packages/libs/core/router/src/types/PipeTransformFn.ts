import { Observable } from "rxjs";

export type PipeTransformFn<T = any, R = T> = (value: T) => Observable<R> | Promise<R> | R;