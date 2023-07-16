import { BehaviorSubject as Observable } from "rxjs";
export declare const useObservable: <T = any>(initialState: T) => (Observable<T> | ((value: T) => void))[];
