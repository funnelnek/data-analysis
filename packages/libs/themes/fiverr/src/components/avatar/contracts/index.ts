import { HTMLAttributes } from "react";

/**
 * The Avatar component properties
 * @public
 */
export interface AvatarProps extends HTMLAttributes<HTMLElement> {
    name: string;
    image?: string;
}