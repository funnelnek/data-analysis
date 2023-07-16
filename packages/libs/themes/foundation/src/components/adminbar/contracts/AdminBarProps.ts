import { HTMLAttributes } from "react";
import { DrawerProps } from "../../drawer/contracts";


export interface AdminBarProps extends Omit<DrawerProps, 'open' | 'hideBackdrop' | 'variant'>, HTMLAttributes<HTMLDivElement> {
    mode?: "collapsed" | "minimized" | "expanded";
}