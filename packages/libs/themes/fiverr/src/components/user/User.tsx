import { FC } from "react";
import { CurrentUserProps } from "./contracts";
import { UserMenu } from "./UserMenu";
import { cx } from "@emotion/css";
import { Avatar } from "../avatar";


/**
 * The current active logged in user.
 * @param {CurrentUserProps} props - The active user properties.
 * @returns {JSX.Element}
 */
export const User: FC<CurrentUserProps> = (props: CurrentUserProps): JSX.Element => {
    let {id, username, isSeller, avatar } = props;
    let styles = cx('active-user', {});

    if (!avatar) {
        avatar = { name: username };
    }

    return (
        <div className={styles}>
            <Avatar {...avatar} />
            <span className="username">{ username }</span>
            <UserMenu />
        </div>
    );
};