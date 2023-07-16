import { HttpResponse } from "@funnelnek/http";
import { Observable } from "rxjs";
import { RouteIncomingSnapshot } from "../contracts";
export type GuardianCanFn = (requestOrResponse: RouteIncomingSnapshot | HttpResponse<any>) => boolean | Observable<boolean> | Promise<boolean>;
