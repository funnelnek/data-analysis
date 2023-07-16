export declare class HttpHeaders {
    private _headers;
    has(name: string): boolean;
    get(name: string): string | null;
    keys(): string[];
    getAll(name: string): string[];
    set(name: string, value: string | string[]): HttpHeaders;
    delete(name: string): HttpHeaders;
}
