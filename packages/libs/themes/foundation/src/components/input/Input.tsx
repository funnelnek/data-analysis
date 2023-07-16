import { FC } from "react";
import { InputProps } from "./contracts/InputProps";


export const Input: FC<InputProps> = (props: InputProps): JSX.Element => {
    let {        
        type = 'text' 
    } = props;

    return (
        <input type={type} />
    );
}