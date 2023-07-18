import { RGB } from "../../color";
import { CONSTRAST_THRESHOLD } from "../constants";

export const hex2Rgb = function(hex: string): RGB {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex) as RegExpExecArray;

    return  {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    };
}


export function luminance(...color: [string]): number;
export function luminance(...color: [number, number, number]): number;
export function luminance(...color: [[number, number, number]]): number;
export function luminance(...color: [string] | [[number, number, number]] | [number, number, number]): number {
    var rgb: RGB | undefined = undefined;

    if (color.length === 1 && typeof color[0] === 'string') {
        rgb = hex2Rgb(color[0]);
    }

    if (arguments.length === 3) {
        rgb = {
            r: arguments[0],
            b: arguments[1],
            g: arguments[2]
        }
    }

    if (color.length === 3) {
        rgb = {
            r: color[0],
            b: color[1],
            g: color[2]
        }
    }
    
    if (!rgb) return 0;

    var r = rgb.r, 
        g = rgb.g, 
        b = rgb.b;

    var a = [r, g, b].map(function(v) {
        v /= 255;

        return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    });

    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export const contrastRatio = (colorA: string, colorB: string) => {
    let lum1 = luminance(colorA);
    let lum2 = luminance(colorB);
    let brightest = Math.max(lum1, lum2);
    let darkest = Math.min(lum1, lum2);
  
    return (brightest + 0.05) / (darkest + 0.05);
}

export const contrastToWhite = function(hexColor: string){
    var whiteIlluminance = 1;
    var lumin = luminance(hexColor);
    return whiteIlluminance / lumin;
}

export const isContrastToWhite = function(hexColor: string){
    return contrastToWhite(hexColor) > CONSTRAST_THRESHOLD;
}


   