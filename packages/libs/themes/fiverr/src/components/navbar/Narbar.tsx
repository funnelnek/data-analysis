import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cx } from '@emotion/css';
import { NavbarProps } from "./contracts";
import { Button } from "../button";
import { CurrentUserProps } from "../user/contracts";
import { User } from "../user/User";


/**
 * The Navbar component
 * @param {NavbarProps} props - The navbar properties.
 * @returns {JSX.Element}
 * @author Robet Banks
 */
export const Navbar: FC<NavbarProps> = (props: NavbarProps): JSX.Element => {
    let {
        active,
        activeThreshold,
        user
    } = props;

    let [isActive, setIsActive] = useState(active);
    let styles = cx('navbar', {
        active: isActive
    });

    function changeIsActive() {
        window.scrollY > 0 ? setIsActive(true) : setIsActive(false);
    }

    useEffect(() => {
        window.addEventListener('scroll', changeIsActive);

        return () => {
            window.removeEventListener('scroll', changeIsActive)
        }
    }, []);

    return (
        <div className={styles}>
            <div className="container">
                <div className="logo">
                    <Link to="/">
                        <span className="nameplate">Fiverr</span>
                        <span className="dot">.</span>
                    </Link>
                </div>
                <div className="links">
                    <span>Fiverr Business</span>
                    <span>Explore</span>
                    <span>English</span>
                    <span>Sign In</span>
                    { !user?.isSeller && <span>Become a Seller</span> }
                    { !user && <Button>Join</Button> }
                    { user && <User {...user} /> }
                </div>                
            </div>
            { isActive && 
                (<>
                    <hr className="divider" />
                    <div className="menu">
                        
                    </div>
                </>)
            }
        </div>
    );
};