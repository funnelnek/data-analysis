import React from "react";
import { DrawerProps } from "./contracts";
import { Backdrop } from "../backdrop";
import { Paper } from "../paper/Paper";
import { Modal } from "../modal";
import * as styles from './styles';
import { DrawerContext } from "./context";
import { DrawerState } from "./contracts/DrawerState";


export const Drawer: React.FC<DrawerProps> = (props: DrawerProps): JSX.Element => {
    let { 
        children, 
        className, 
        open = false,
        ModalProps = { open },
        PaperProps = {},
        hideBackdrop = false,
        variant = 'temporary',
        ...other 
    } = props;

    let context: DrawerState = {
        open,
        variant
    }

    return (
        <div {...other} css={styles.root}>
            <DrawerContext.Provider value={context}>
                <Backdrop hide={hideBackdrop}>
                    <Modal {...ModalProps}>
                        <Paper {...PaperProps}>
                            { children }
                        </Paper>
                    </Modal>
                </Backdrop>
            </DrawerContext.Provider>
        </div>
    );
}