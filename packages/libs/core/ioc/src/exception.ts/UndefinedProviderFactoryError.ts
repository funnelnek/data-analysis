export class UndefinedProviderFactoryError extends Error {
    constructor() {
        super("Undefined provider factory registration");
    }
}