import { download } from "src/utils";
import { SaveCanvasOptions } from "../types";


export function save(canvas: HTMLCanvasElement, options: SaveCanvasOptions) {
    let { width, height, url, type = "image/png" } = options;
    let mime = canvas.toDataURL(type);
    let image = new Image(width, height);
    image.src = url;

    image.onload = () => {
        let canvas = document.createElement('canvas');   
        let context = canvas.getContext('2d');
        
        canvas.width = width;        
        canvas.height = height;

        // draw image in canvas starting left-0 , top - 0  
        if (context) {
            context.drawImage(image, 0, 0, width, height);
        }
        
        download(url, mime);
    };
}