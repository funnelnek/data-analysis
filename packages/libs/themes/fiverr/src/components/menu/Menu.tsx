import { FC, ReactElement } from "react";
import { MenuProps } from "./contracts";


/**
 * The Menu component.
 * 
 * @param {MenuProps} props - The Menu component props
 * @returns {ReactElement}
 */
export const Menu: FC<MenuProps> = (props: MenuProps) => {
    return ( 
        <menu></menu>
     );
};
 
export default Menu;