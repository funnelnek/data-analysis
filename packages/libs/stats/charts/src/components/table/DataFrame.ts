import { IEnumerable } from "../../contracts/collection/IEnumerable";
import { IDataFrame } from "./contract/IDataFrame";


export class DataFrame<T extends IEnumerable = IEnumerable> implements IDataFrame<T>, Iterable<T> {
    _columns: string[] = [];
    _data: T[] = [];
    _sortables: string[] = [];    
    
    get columns(): string[] {
        return this._columns;
    }
    
    get data(): T[] {
        return this._data;
    }

    get sortables(): string[] {
        return this._sortables;
    }
    
    [Symbol.iterator](): Iterator<T, any, undefined> {
        throw new Error("Method not implemented.");
    }
}