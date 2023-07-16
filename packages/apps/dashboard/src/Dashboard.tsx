import { FC } from "react";
import { AdminBar } from '@funnelnek/themes';


export const Dashboard: FC<any> = (props: any): JSX.Element => {
    return (
        <div id="dashboard" className="scene">
            <AdminBar></AdminBar>
            <div className="main-interface">
                <div className="toolbar">
                    
                </div>
                <main id="stage">

                </main>
            </div>
        </div>
    );
}