type Listener<T extends Array<any>> = (...args: T) => void;

export class EventEmmiter<EventMap extends Record<string, Array<any>>> {
    private static instance: EventEmmiter<any>;
    
    private eventListeners: {
        [K in keyof EventMap]?: Set<Listener<EventMap[K]>>;
    } = {};

    private constructor() {}

    static getInstance<EventMap extends Record<string, Array<any>>>(): EventEmmiter<EventMap> {
        if (!EventEmmiter.instance) {
            EventEmmiter.instance = new EventEmmiter<EventMap>();
        }
        return EventEmmiter.instance;
    }

    on<K extends keyof EventMap>(eventName: K, listener: Listener<EventMap[K]>) {
        const listeners = this.eventListeners[eventName] ?? new Set();
        listeners.add(listener);
        this.eventListeners[eventName] = listeners;
    }

    emit<K extends keyof EventMap>(eventName: K, ...args: EventMap[K]) {
        const listeners = this.eventListeners[eventName] ?? new Set();
        for(const listener of listeners) {
            listener(...args);
        }
    }
}