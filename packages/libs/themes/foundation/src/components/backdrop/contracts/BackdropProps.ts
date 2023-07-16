import { HTMLAttributes } from "react";

export interface BackdropProps extends HTMLAttributes<HTMLDivElement> {
    hide?: boolean;
}