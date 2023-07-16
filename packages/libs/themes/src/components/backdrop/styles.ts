import { FunctionInterpolation, Theme, css } from "@emotion/react";


export const root: FunctionInterpolation<Theme> = (theme: Theme) => {
    return css({
        label: 'backdrop',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0, var(--color-backdrop-opacity))',
    });
}