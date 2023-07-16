import { FC } from "react"
import { Drawer } from "../drawer";
import { AdminBarProps } from "./contracts/AdminBarProps";



export const AdminBar: FC<AdminBarProps> = (props: AdminBarProps): JSX.Element => {
    let {
        children,
        mode = "expanded"
    } = props;

    return (
        <div>
            <Drawer 
                variant="persistent"
                hideBackdrop={true}>
                { children }
            </Drawer>
        </div>
    );
}