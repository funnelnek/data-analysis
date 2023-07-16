export class DuplicateProviderError extends Error {
    constructor() {
        super("Invalid provider as singleton token already exists");
    }
}