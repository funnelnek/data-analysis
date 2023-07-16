import { Token } from "../types/Token";
import { Reflector } from "./Reflector";
import { Type } from "./Type";


export interface InjectableOptions {
    multi?: boolean;
    alias?: Token,
    provides?: Token;
    singleton?: boolean;
    providedIn?: Reflector | Type;
}