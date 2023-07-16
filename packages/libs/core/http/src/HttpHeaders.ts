export class HttpHeaders {
    private _headers: Map<string, string> = new Map<string, string>();


    has(name: string): boolean {
        return this._headers.has(name);
    }

    get(name: string): string | null {
        return this._headers.get(name) ?? null;
    }

    keys(): string[] {
        return [...this._headers.keys()];
    }

    getAll(name: string): string[] {         
        return [...this._headers.values()];
    }

    set(name: string, value: string | string[]): HttpHeaders {
        if (Array.isArray(value)) {
            value.forEach(v => this._headers.set(name, v))
            return this;
        }

        this._headers.set(name, value);
        return this;
    }

    delete(name: string): HttpHeaders {
        this._headers.delete(name);
        return this;        
    }
}