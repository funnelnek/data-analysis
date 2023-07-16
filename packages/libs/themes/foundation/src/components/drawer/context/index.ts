import { createContext } from "react";
import { DrawerState } from "../contracts/DrawerState";


export const DrawerContext = createContext<DrawerState>({
    open: false,
    variant: 'temporary'
});