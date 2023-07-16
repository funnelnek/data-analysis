export interface Provider<T = any> {
    provide: T;
    multi?: boolean;    
    singleton?: boolean;
}