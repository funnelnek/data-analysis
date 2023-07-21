import { FC } from "react";

/**
 * The header template
 * @param props 
 * @returns {JSX.Element}
 */
export const Header: FC<any> = (props: any): JSX.Element => {
    return (
        <header className="header">
            <div className="logo-box">
                <img src="assets/img/logo-white.png" alt="Natours White Logo" className="logo" />
            </div>
            <div className="text-box">
                <h1 className="heading-primary">
                    <span className="heading-primary-main">Outdoors</span>
                    <span className="heading-primary-sub">is where life happens</span>
                </h1>
            </div>
        </header>
    );
};