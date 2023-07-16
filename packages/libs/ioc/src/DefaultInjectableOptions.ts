import { InjectableOptions } from "./contracts/InjectableOptions";
import { injector } from "./Injector";

export const DefaultInjectableOptions: InjectableOptions = {
    multi: false,
    singleton: true,
    providedIn: injector
}