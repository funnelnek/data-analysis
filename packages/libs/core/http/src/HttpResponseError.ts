import { HttpResponseBase } from "./HttpResponseBase";

export class HttpResponseError extends HttpResponseBase {
    readonly ok: boolean = false;
}