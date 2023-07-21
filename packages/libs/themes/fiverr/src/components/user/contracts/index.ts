import { AvatarProps } from "../../avatar";

export interface UserMenuProps {

}

export interface CurrentUserProps {
    id: string;
    username: string;
    isSeller: boolean;
    avatar?: AvatarProps;
}