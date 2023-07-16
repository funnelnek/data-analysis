import { FC } from "react";
import { AdminBar, Stage } from "@funnelnek/themes";


export const AppShell: FC<any> = (props: any): JSX.Element => {
    let {} = props;

    
    return (
        <div>
            <AdminBar />
            <Stage></Stage>
        </div>
    );
}