import { HttpResponseBase } from "./HttpResponseBase";
export declare class HttpResponse<T> extends HttpResponseBase {
    readonly body: T | null;
    clone(update: HttpResponseBase): HttpResponse<T>;
}
