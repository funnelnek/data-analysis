import { Observable } from "rxjs";
export interface PipeTransform<T = any, R = T> {
    transform(value: T): Observable<R> | Promise<R> | R;
}
