import { Type } from "@funnelnek/ioc";
import { Guardian } from "../contracts";
import { GuardConfig } from "../contracts/GuardConfig";
export type GuardOptions = GuardConfig | Type<Guardian>[] | Type<Guardian> | boolean;
