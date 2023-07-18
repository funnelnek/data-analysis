import { FONT } from "../../constants";

/**
 * Converts to pixel to rem.
 * @param {number} px - The pixel size.
 * @param {number} base - The base pixel size.
 * @returns {number} - The rem size.
 */
export function px2rem(px: number, base: number = FONT.BASE_SIZE): number {
    return px / base;
}