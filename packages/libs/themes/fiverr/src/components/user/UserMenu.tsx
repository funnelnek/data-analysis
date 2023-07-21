import { FC } from 'react';
import { UserMenuProps } from "./contracts";
import { Menu } from '../menu';


/**
 * The current active user menu.
 * @param {UserMenuProps} props 
 * @returns {JSX.Element}
 * @author Robert Banks
 */
export const UserMenu: FC<UserMenuProps> = (props: UserMenuProps): JSX.Element => {
    return (
        <Menu>
            
        </Menu>
    );
};