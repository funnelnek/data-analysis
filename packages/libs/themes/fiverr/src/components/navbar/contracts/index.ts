import { HTMLAttributes } from "react";
import { CurrentUserProps } from "../../user/contracts";

/**
 * The Navbar properties
 * @interface
 * @extends {HTMLAttributes<HTMLDivElement>}
 * @author Robert Banks
 */
export interface NavbarProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Determines if the navbar is active. 
     * The navbar becomes active when the user scroll down pass a threshold.
     */
    active?: boolean;
    /**
     * Sets the active threshold to which the navbar becomes active.
     */
    activeThreshold?: number;
    /**
     * The current logged in active user.
     */
    user?: CurrentUserProps;
}