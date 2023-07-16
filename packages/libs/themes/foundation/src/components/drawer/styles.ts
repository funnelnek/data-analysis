import { FunctionInterpolation, Theme, css } from "@emotion/react";


export const root = (styles: any): FunctionInterpolation<Theme> => {
    return (theme: Theme) => css({});
};