import { FC } from "react";
import { cx } from '@emotion/css';
import { AvatarProps } from './contracts';


/**
 * The Avatar component. 
 * 
 * @param {AvatarProps} props - The avatar component properties
 * @returns {JSX.Element}
 */
export const Avatar: FC<AvatarProps> = (props: AvatarProps): JSX.Element => {
    let {} = props;
    let styles = cx('avatar');
    
    return ( 
        <div className={styles}>

        </div>
    );
}
 
export default Avatar;