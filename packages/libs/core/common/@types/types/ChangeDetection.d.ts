export type ChangeDetection<T = any> = (state: T | ((previousState: T) => T)) => T;
