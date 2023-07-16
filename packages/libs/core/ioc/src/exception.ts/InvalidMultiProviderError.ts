export class InvalidMultiProviderError extends Error {
    constructor() {
        super("Invalid multi-provder configuration. Must set 'multi' to true")
    }
}