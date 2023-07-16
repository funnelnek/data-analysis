import { Type } from "../contracts";

export type ClassDecorator = (ctor: Type) => Type | void;