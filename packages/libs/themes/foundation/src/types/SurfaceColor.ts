export type SurfaceContainerColorPalette = {
    top: string;
    low: string;
    high: string;
    color: string;
    bottom: string;
}

export type SurfaceColorPalette = {
    color: string;
    dim: string;
    bright: string;
    container: SurfaceContainerColorPalette;
}