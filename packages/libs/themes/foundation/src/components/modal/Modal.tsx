import React, { FC } from "react";
import clsx from 'clsx';


export const Modal: FC<any> = ({ open, children, className }: any): JSX.Element => {
    let clx = clsx(className, {open});

    return (
        <div>
            { children }
        </div>
    );
}