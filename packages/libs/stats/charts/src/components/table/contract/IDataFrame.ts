import { IEnumerable } from "../../../contracts/collection/IEnumerable";


export interface IDataFrame<T extends IEnumerable = IEnumerable> {
    // The data frame columns
    columns: string[];
    // The provided dataset.    
    data: T[];
    // The columns that are sortable.
    sortables: string[];
}