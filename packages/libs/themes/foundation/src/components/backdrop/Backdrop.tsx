import React, { FC } from "react";
import { BackdropProps } from "./contracts/BackdropProps";
import * as styles from './styles';


export const Backdrop: FC<BackdropProps> = ({ children, hide = false }: BackdropProps): JSX.Element => {
    
    return (
        <div css={styles.root}>
            { children }
        </div>
    );
}