export class ExistingProviderNotFoundError extends Error {
    constructor() {
        super("Existing provider was not found");
    }
}