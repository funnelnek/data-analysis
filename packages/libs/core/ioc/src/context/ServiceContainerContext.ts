import { createContext } from "react";
import { Reflector } from "../contracts";
import injector from "../Injector";

export const ServiceContainerContext = createContext<Reflector>(injector);