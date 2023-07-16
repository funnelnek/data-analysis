import { Observer, Subscription } from "rxjs";
import { ChangeDetection } from "../../types/event/ChangeDetection";
import { EventHandler } from "../../types/EventHandler";
import { NextFn } from "../../types/function/NextFn";


export interface IEventEmitter<T = any> {
    on(event: string, observer: Observer<T>): Subscription;
    on(event: string, next: NextFn<T>): Subscription;
    on(event: string, state: ChangeDetection<T>, changeDetection: boolean): Subscription;
    on(event: string, handler: EventHandler<T>): void;    
    off(event: string, handler: EventHandler<T>): Subscription | void;
    once(event: string, handler: EventHandler<T>): Subscription | void;
    emit(event: string, ...args: any[]): void;
}