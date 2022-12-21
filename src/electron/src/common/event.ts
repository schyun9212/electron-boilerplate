import { EventEmitter } from "events";
import { IDisposable } from "./lifecycle";

type EventCallback = <T>(payload: T) => void;

// Pass union string type to restrict usable event names
export class EventManager<T extends string> implements IDisposable {
  protected _emitter: EventEmitter;

  constructor() {
    this._emitter = new EventEmitter();
  }

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

  reserve<F>(date: Date, eventName: T, payload: F) {}

  dispose(): void {
    this._emitter.removeAllListeners();
  }
}
