import { Observer } from "rxjs";
import { ChangeDetection } from "./ChangeDetection";
import { EventHandler } from "./EventHandler";
import { NextFn } from "./NextFn";
export type EmitterHandler<T = any> = EventHandler<T> | NextFn<T> | Observer<T> | ChangeDetection<T>;
