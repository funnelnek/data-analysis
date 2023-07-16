import { HTMLAttributes } from "react";
import { Anchor } from "../../../types";
import { PaperProps } from "../../paper/contracts/PaperProps";
import { ModalProps } from "../../modal/contracts/ModelProps";
import { DrawerVariant } from "../types/DrawerVariant";


export interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
    anchor?: Anchor;
    elevation?: number;
    hideBackdrop?: boolean;
    ModalProps?: ModalProps;
    onClose?: (event: object) => void;
    open?: boolean;
    PaperProps?: PaperProps;
    SlideProps?: object;
    transitionDuration?: object;
    variant?: DrawerVariant;
}