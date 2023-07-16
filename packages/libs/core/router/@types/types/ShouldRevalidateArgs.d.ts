import { AgnosticDataRouteMatch, Submission } from "@remix-run/router";
import { DataResult } from "@remix-run/router/dist/utils";
export type ShouldRevalidateArgs = {
    currentUrl: URL;
    currentParams: AgnosticDataRouteMatch["params"];
    nextUrl: URL;
    nextParams: AgnosticDataRouteMatch["params"];
    formMethod?: Submission["formMethod"];
    formAction?: Submission["formAction"];
    formEncType?: Submission["formEncType"];
    formData?: Submission["formData"];
    actionResult?: DataResult;
    defaultShouldRevalidate: boolean;
};
