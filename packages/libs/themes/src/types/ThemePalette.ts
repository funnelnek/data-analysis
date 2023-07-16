import { contrastRatio, contrastToWhite, hex2Rgb, isContrastToWhite, luminance } from "../systems/color/utils/contrast";
import { CommonColor } from "./CommonColor";
import { SurfaceColorPalette } from "./SurfaceColor";
import { ThemeColor } from "./ThemeColor";
import { ThemeMode } from "./ThemeMode";


export type ThemePalette = {
    mode: ThemeMode;
    common: CommonColor;
    primary: ThemeColor;
    secondary: ThemeColor;
    teritary: ThemeColor;
    success: ThemeColor;
    warning: ThemeColor;
    error: ThemeColor;
    info: ThemeColor;
    surface: SurfaceColorPalette;
    contrastThreshold: number;
    contrastRatio: typeof contrastRatio;
    hex2Rgb: typeof hex2Rgb;
    luminance: typeof luminance;
    contrastToWhite: typeof contrastToWhite;
    isContrastToWhite: typeof isContrastToWhite;
}