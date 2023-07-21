import { FC } from "react";
import { ButtonProps } from "./contracts";


/**
 * Button component
 * @author Robert Banks
 * @param props 
 * @returns {JSX.Element} The react element.
 */
export const Button: FC<ButtonProps> = (props: ButtonProps): JSX.Element => {
    let {
        children
    } = props;

    return (
        <button>
            { children }
        </button>
    );
};