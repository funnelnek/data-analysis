export const MIN_ELEVATION_DPI = 0;
export const MAX_ELEVATION_DPI = 16;
export const MIN_ELEVATION_LEVEL = 0;
export const MAX_ELEVATION_LEVEL = 6;
export const DEFAULT_ELEVATION_LEVEL = 0;

export const enum ElevationLevelRange {
    MIN = MIN_ELEVATION_LEVEL,
    MAX = MAX_ELEVATION_LEVEL
}


export enum ElevationMappings {
    L0 = MIN_ELEVATION_DPI + 0,
    L1 = ElevationMappings.L0 + 1,
    L2 = ElevationMappings.L1 + 2,
    L3 = ElevationMappings.L2 + 3,
    L4 = ElevationMappings.L3 + 2,
    L5 = ElevationMappings.L4 + 4,
}
