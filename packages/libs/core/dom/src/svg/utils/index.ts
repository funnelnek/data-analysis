import { blob, clone, downloadImage, outerHTML } from "../../utils";
import { SaveCanvasOptions } from "../../canvas/types";
import { SVGBoundingBox } from "../types";
import { save } from "src/canvas/utils";
import { ImageDownloadOptions } from "src/types";

/**
 * Gets the bounding box of an SVG element.
 * @param element - The SVG element
 */
export function bbox(element: SVGGraphicsElement): SVGBoundingBox {
    return element.getBBox();
}
/**
 * 
 * @param {SVGGraphicsElement} svg 
 * @returns 
 */
export function createSVGUrl(svg: SVGGraphicsElement): string {    
    let data = outerHTML(clone(svg, true));
    let img = blob([data], {type:'image/svg+xml;charset=utf-8'});

    return (window.URL || window.webkitURL || window).createObjectURL(img);
}
/**
 * Converts an SVG element to a Image element. 
 * 
 * @param {SVGGraphicsElement} svg - The SVG element. 
 * @returns {HTMLImageElement} A DOM image element.
 */
export function svg2img(svg: SVGGraphicsElement): HTMLImageElement {
    let { width, height } = bbox(svg);
    let url = createSVGUrl(svg);
    let image = new Image(width, height);

    image.src = url;

    return image;
}
/**
 * Save an SVG element to an image.
 * @param svg 
 */
export function saveSVGElement(svg: SVGGraphicsElement, options: ImageDownloadOptions): void {       
    downloadImage(svg2img(svg), options);
}
