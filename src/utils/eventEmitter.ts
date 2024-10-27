type Listener<T extends Array<any>> = (...args: T) => void;

export class EventEmitter<EventMap extends Record<string, Array<any>>> {
  private static instance: EventEmitter<any>;

  private eventListeners: {
    [K in keyof EventMap]?: Set<Listener<EventMap[K]>>;
  } = {};

  private constructor() { }

  static getInstance<EventMap extends Record<string, Array<any>>>(): EventEmitter<EventMap> {
    if (!EventEmitter.instance) {
      EventEmitter.instance = new EventEmitter<EventMap>();
    }
    return EventEmitter.instance;
  }

  on<K extends keyof EventMap>(eventName: K, listener: Listener<EventMap[K]>):void {
    const listeners = this.eventListeners[eventName] ?? new Set();
    listeners.add(listener);
    this.eventListeners[eventName] = listeners;
  }

  emit<K extends keyof EventMap>(eventName: K, ...args: EventMap[K]): void {
    const listeners = this.eventListeners[eventName] ?? new Set();
    for (const listener of listeners) {
      listener(...args);
    }
  }
}