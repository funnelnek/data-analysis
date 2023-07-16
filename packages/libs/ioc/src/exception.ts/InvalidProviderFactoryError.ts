export class InvalidProviderFactoryError extends Error {
    constructor() {
        super("Invalid provider factory registry");
    }
}