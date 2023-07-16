import React, { FC } from "react";
import { useTheme } from "../../hooks";


export const Paper: FC<any> = (props: any): JSX.Element => {
    let { children, ...other} = props;
    
    let theme = useTheme();

    return (
        <div>
            { children }
        </div>
    );
}