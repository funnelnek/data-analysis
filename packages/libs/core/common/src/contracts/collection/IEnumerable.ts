export interface IEnumerable<T = any> {
    [k: string | symbol]: T;
}