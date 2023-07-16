import { HttpResponse } from "./HttpResponse";
import { HttpResponseBase } from "./HttpResponseBase";

export class HttpRequest<T> extends HttpResponseBase {
    readonly body!: T | null;
    clone(update: HttpResponseBase): HttpResponse<T> {
        return this;
    }
}