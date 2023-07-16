import { HttpResponse } from "./HttpResponse";
import { HttpResponseBase } from "./HttpResponseBase";
export declare class HttpRequest<T> extends HttpResponseBase {
    readonly body: T | null;
    clone(update: HttpResponseBase): HttpResponse<T>;
}
