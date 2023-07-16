import { FC } from "react";


export const Stage: FC<any> = (props: any): JSX.Element => {
    let {
        children
    } = props;

    return (
        <div>
            { children }
        </div>
    )
}