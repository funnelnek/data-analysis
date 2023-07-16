import { FC } from "react";
import { Input } from "./Input";
import { InputProps } from "./contracts/InputProps";


export const File: FC<InputProps> = (props: InputProps): JSX.Element => {
    let {
        startAdornment,
        endAdornment        
    } = props;

    return (
        <Input type="file" />
    );
}