import { BlobOptions, ImageDownloadOptions } from "../types";

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
 * @param image - The DOM image element.
 */
export function downloadImage(image: HTMLImageElement, options: ImageDownloadOptions): void {
    let { width, height } = image;
    let { type, quality, name } = options;
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
