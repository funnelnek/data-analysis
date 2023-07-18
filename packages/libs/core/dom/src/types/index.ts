/**
 * 
 */
export type BlobOptions = {
    type: string;
    endings?: "transparent" | "native";
}
/**
 * 
 */
export type ImageDownloadOptions = {
    image: HTMLImageElement,
    name: string;
    type?: string;
    quality?: any;
}
/**
 * 
 */
export type BulkImageDownloadOptions = {  
    name: string;
    images: ImageDownloadOptions[]
};