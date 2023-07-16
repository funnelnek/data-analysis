import { ElevationMappings, MAX_ELEVATION_LEVEL, MIN_ELEVATION_DPI, MIN_ELEVATION_LEVEL } from "../constants";


export function elevation(level: number): any[] {
    if (level < MIN_ELEVATION_LEVEL || level > MAX_ELEVATION_LEVEL) {
        throw new Error(`Elevation level must be in the range of ${MIN_ELEVATION_LEVEL} - ${MAX_ELEVATION_LEVEL}`);
    }

    let dpi: number = ElevationMappings["L0"];

    switch (level) {        
        case 1:
            dpi = ElevationMappings["L1"];
            break;
        case 2:
            dpi = ElevationMappings["L2"];
            break;
        case 3:
            dpi = ElevationMappings["L3"];
            break;
        case 4:
            dpi = ElevationMappings["L4"];
            break;
        case 5:
            dpi = ElevationMappings["L5"];
            break;
    }

    return [];
}