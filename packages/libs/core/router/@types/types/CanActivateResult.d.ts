import { Observable } from "rxjs";
export type CanActivateResult = Observable<boolean | Response> | Promise<boolean | Response> | Response | boolean;
