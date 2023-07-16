import { HttpEventType } from "./constants/HttpEventType";
import { HttpHeaders } from "./HttpHeaders";
export declare class HttpResponseBase {
    readonly headers: HttpHeaders;
    readonly status: number;
    readonly url: string | null;
    readonly ok: boolean;
    readonly statusText: string;
    readonly type: HttpEventType;
}
