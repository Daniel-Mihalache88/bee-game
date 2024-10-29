import { EventEmitter } from './eventEmitter';

type EventMap = {
  testOne: [string, number],
  testTwo: [boolean]
};

describe('EventEmitter', () => {
  let eventEmitter: EventEmitter<EventMap>;

  beforeEach(() => {
    eventEmitter = EventEmitter.getInstance<EventMap>();
  });

  it('should create', () => {
    expect(eventEmitter).toBeTruthy();
  });

  it('should return the same instance', () => {
    const newInstance = EventEmitter.getInstance<EventMap>();
    expect(newInstance).toBe(eventEmitter);
  });

  it('should register and call a listener', () => {
    const listener = jest.fn();
    eventEmitter.on('testOne', listener);
    eventEmitter.emit('testOne', 'testString', 123);

    expect(listener).toHaveBeenCalledWith('testString', 123);
  });

  it('should handle multiple listeners for the same event', () => {
    const listenerOne = jest.fn();
    const listenerTwo = jest.fn();

    eventEmitter.on('testOne', listenerOne);
    eventEmitter.on('testOne', listenerTwo);
    eventEmitter.emit('testOne', 'multipleListeners', 456);

    expect(listenerOne).toHaveBeenCalledWith('multipleListeners', 456);
    expect(listenerTwo).toHaveBeenCalledWith('multipleListeners', 456);
  });
});
