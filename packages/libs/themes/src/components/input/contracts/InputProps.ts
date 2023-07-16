import { HTMLAttributes, ReactNode } from "react";
import { AutoCompleteValue, InputType } from "../types";
import { InputAdornment } from "./InputAdornment";



export interface GlobalInputProps {
    disabled?: boolean;
    form?: string;
    name?: string;
    type?: InputType;
}

export interface InputProps extends GlobalInputProps, HTMLAttributes<HTMLInputElement> {
    autoComplete?: AutoCompleteValue;
    autoFocus?: boolean;
    color?: string;
    defaultValue?: any;
    value?: any;    
    startAdornment?: InputAdornment;
    endAdornment?: InputAdornment;
}