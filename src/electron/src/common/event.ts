import { EventEmitter } from "events";
import { IDisposable } from "./lifecycle";
import { Scheduler, ScheduleRule } from "./scheduler";

type EventCallback = <T>(payload: T) => void;

// Pass union string type to restrict usable event names
export class Emitter implements IDisposable {
  protected _emitter: EventEmitter;
  protected _scheduler: Scheduler;

  constructor() {
    this._emitter = new EventEmitter();
    this._scheduler = new Scheduler();
  }

  emit<F>(eventName: string, payload: F) {
    this._emitter.emit(eventName, payload);
  }

  on(eventName: string, callback: EventCallback): void {
    this._emitter.on(eventName, callback);
  }

  addListener(eventName: string, callback: EventCallback): void {
    this.on(eventName, callback);
  }

  removeListener(eventName: string, callback: EventCallback) {
    this._emitter.removeListener(eventName, callback);
  }

  schedule<F>(eventName: string, rule: ScheduleRule, payload: F) {
    this._scheduler.schedule(eventName, rule, () => {
      this._emitter.emit(eventName, payload);
    });
  }

  dispose(): void {
    this._emitter.removeAllListeners();
    this._scheduler.dispose();
  }
}

export class RestrictedEmitter<T extends string> extends Emitter {
  emit<F>(eventName: T, payload: F) {
    this._emitter.emit(eventName, payload);
  }

  on(eventName: T, callback: EventCallback): void {
    this._emitter.on(eventName, callback);
  }

  addListener(eventName: T, callback: EventCallback): void {
    this.on(eventName, callback);
  }

  removeListener(eventName: T, callback: EventCallback) {
    this._emitter.removeListener(eventName, callback);
  }

  schedule<F>(eventName: T, rule: ScheduleRule, payload: F) {
    this._scheduler.schedule(eventName, rule, () => {
      this._emitter.emit(eventName, payload);
    });
  }
}
