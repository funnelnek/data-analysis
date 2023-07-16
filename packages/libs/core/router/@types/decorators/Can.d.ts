import { RouteActivation } from "../constants";
import { GuardType } from "../types";
export declare const Can: (type: RouteActivation) => (ctor: GuardType) => void;
