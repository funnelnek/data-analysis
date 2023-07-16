import React from "react";
import { useContext } from "react";
import { ServiceContainerContext } from "../context";
import { ServiceContainerProps } from "../contracts/ServiceContainerProps";


export const ServiceContainer = ({ injector, children }: ServiceContainerProps) => {
    const context = injector || useContext(ServiceContainerContext);

    return (
        <ServiceContainerContext.Provider value={context}>
            { children }
        </ServiceContainerContext.Provider>            
    );
}