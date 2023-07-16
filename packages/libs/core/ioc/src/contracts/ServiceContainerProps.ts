import { ReactNode } from "react";
import { Reflector } from "./Reflector";

export interface ServiceContainerProps {
    injector?: Reflector;    
    children: ReactNode;
}