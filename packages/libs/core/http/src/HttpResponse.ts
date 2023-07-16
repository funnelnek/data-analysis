import { HttpResponseBase } from "./HttpResponseBase";

export class HttpResponse<T> extends HttpResponseBase {
    readonly body!: T | null;
    clone(update: HttpResponseBase): HttpResponse<T> {
        return this;
    }
}