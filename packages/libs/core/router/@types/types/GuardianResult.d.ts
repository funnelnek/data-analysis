import { Observable } from "rxjs";
export type GuardianResult = Observable<boolean> | Promise<boolean> | boolean;
