import { EventEmitter } from "events";

enum Foo {}

type EventCallback = (...args: any[]) => void;

export class EventSystem<T extends Foo> {
  protected _count: number = 0;
  protected _emitter: EventEmitter;
  protected _events: { [key in T]?: { [id: number]: EventCallback } } = {};

  constructor() {
    this._emitter = new EventEmitter();
  }

  addCustomEvent(eventName: string, listener: (...args: any[]) => void) {
    this._emitter.on(eventName, listener);
  }

  on(eventName: T, callback: EventCallback) {}
}

export class EventManager {}
