import { useContext } from "react";
import { ServiceContainerContext } from "../context";
import { Reflector } from "../contracts";

export const useInjector = (): Reflector => {
    return useContext(ServiceContainerContext);
}