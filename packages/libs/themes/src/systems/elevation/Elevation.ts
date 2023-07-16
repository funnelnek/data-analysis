import { IElevation } from "./IElevation";

export class Elevation implements IElevation {
    _level: number = 0;
    _dp: number = 0;


    set level(elevation: number) {
        this._level = elevation;
    }

    get level(): number {
        return this._level;
    }
}