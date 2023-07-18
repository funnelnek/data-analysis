import { Type } from "@funnelnek/ioc";
import { BlobOptions, BulkImageDownloadOptions, ImageDownloadOptions } from "../types";
import Zip from "jszip";


export function url(): Type<URL> {
    return window.URL || window.webkitURL;
}

/**
 * Split the data:image/png;base64, from the data URL.
 * @param dataURL 
 * @returns 
 */
export function getBase64String(dataURL: string) {
    var idx = dataURL.indexOf('base64,') + 'base64,'.length;
    return dataURL.substring(idx);
}
/**
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode | MDN - Node.cloneNode}
 * @typeParam T - The type of Node.
 * @param {Node} node - The node to clone.
 * @returns {T} The cloned node.
 */
export function clone<T extends Node = Node>(node: T, deep: boolean = false): T {
    return node.cloneNode(deep) as T;
}
/**
 * Gets the serialized HTML fragment describing the element including its descendants.
 * @param element 
 * @returns 
 */
export function outerHTML(element: Element): string {
    return element.outerHTML;
}
/**
 * Creates a new Blob object.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob | MDN Blob}
 * @see {@link BlobOptions}
 * 
 * @param {any[]} data - An iterable object such as an Array, having ArrayBuffers, TypedArrays, DataViews, Blobs, strings, or a mix of any of such elements, that will be put inside the Blob.
 * @param {BlobOptions} options - The Blob configuration options.
 * @returns 
 */
export function blob(data: any[], options: BlobOptions): Blob {
    return new Blob(data, options);
}
/**
 * Dynamically download source content. 
 * It will dynamically insert an invisible anchor tag using the href paramerter and setting the name. 
 * Once inserted it emit a click event on the anchor tag triggering it to download the source content and then removes the anchor tag.
 * 
 * @example
 * ```
 * var link = document.createElement('a');
    link.download = name;
    link.style.opacity = "0";
    link.href = href;
    
    document.append(link);
    link.click();
    link.remove();
 * ```
 * @param {string} href - The url to the source file.
 * @param {string} name - Sets the file name.
 * @returns {void}
 */
export function download(href: string, name: string): void {
    var link = document.createElement('a');
    link.download = name;
    link.style.opacity = "0";
    link.href = href;
    
    document.append(link);
    link.click();
    link.remove();
}
/**
 * Dynamically download an image. 
 * @param {ImageDownloadOptions} options - The download image options.
 */
export function downloadImage(options: ImageDownloadOptions): void {
    let { image, name, type, quality } = options;
    let { width, height } = image;
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d') as CanvasRenderingContext2D;
    
    canvas.width = width;
    canvas.height = height;    
    
    image.onload = () => {
        context.drawImage(image, 0, 0, width, height);
        
        let file = canvas.toDataURL(type, quality);
        download(file, name);
    }
}
/**
 * Dynamically download a bulk of images. 
 * @param {BulkImageDownloadOptions} options - The bulk options 
 * @returns {void}
 */
export function downloadBulkImages(options: BulkImageDownloadOptions): void {
    let { name, images } = options;
    let zip = new Zip();
    let folder = zip.folder(name);
    
    images.forEach((src) => {
        let { image, type, quality, name } = src;
        let { width, height } = image;
        let canvas = document.createElement('canvas');
        let cxt = canvas.getContext('2d') as CanvasRenderingContext2D; 
        
        canvas.width = width;
        canvas.height = height;        

        cxt.drawImage(image, 0, 0, width, height);

        let url = canvas.toDataURL(type, quality);
        let base = getBase64String(url);
        
        folder?.file(name, base, { base64: true });
    });

    zip.generateAsync({type:"blob"}).then(function (content) {
        let file = URL.createObjectURL(content);
        download(file, name);
    });
}
/**
 * Sets the userSelect attribute.
 * 
 * @typeParam {HTMLElement} T - The HTMLElement type.
 * @param {HTMLElement} this - The HTML element.
 * @param value - The value for the userSelect attribute.
 * @returns {T} - The same HTML element.
 */
export function setUserSelect<T extends HTMLElement | SVGElement = HTMLElement>(this: T, value: string): T {
    if (this.style.userSelect) {
        this.style.userSelect = value;
        return this;
    }

    if (!this.style.userSelect && 'webkitUserSelect' in this.style) {
        this.style.webkitUserSelect = value;
        return this;
    }

    if ('mozUserSelect' in this.style) {
        this.style.mozUserSelect = value;
        return this;
    }

    if ('msUserSelect' in this.style) {
        this.style.msUserSelect = value;
        return this;
    }

    if ('oUserSelect' in this.style) {
        this.style.oUserSelect = value;
        return this;
    }

    return this;
}
/**
 * Creates a Blob object of an element outer html.
 * @returns {Blob}
 */
export function elementSnapshot(this: HTMLElement | SVGElement): Blob {
	var screenshot = this.cloneNode(true) as HTMLElement;

	screenshot.style.pointerEvents = 'none';
	screenshot.style.overflow = 'hidden';
	setUserSelect.call(screenshot, 'none');
	screenshot.dataset.scrollX = window.scrollX.toString();
	screenshot.dataset.scrollY = window.scrollY.toString();

	var blob = new Blob([screenshot.outerHTML], {
		type: 'text/html'
	});

	return blob;
}