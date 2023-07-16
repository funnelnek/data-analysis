import React, { FC } from "react";
import { NavigationProps } from "./contracts";


export const Navigation: FC<NavigationProps> = (props: NavigationProps): JSX.Element => {
    let {
        children
    } = props;

    return (
        <nav>
            { children }
        </nav>
    );
}