/**
 * @jest-environment jsdom
 */
import { NewPlayer } from './newPlayerComponent';
import { EventEmitter } from '../utils/eventEmitter';

jest.mock('../utils/eventEmitter', () => {
  return {
    EventEmitter: {
      getInstance: jest.fn().mockReturnValue({
        emit: jest.fn(),
      }),
    },
  };
});

describe('NewPlayer', () => {
  let component: NewPlayer;

  beforeEach(() => {
    component = new NewPlayer();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render overlay with form, input, and button', () => {
    expect(document.body.classList.contains('no-overflow')).toBe(true);

    const form = document.querySelector('form.new-player-overlay');
    const input = form?.querySelector('input');
    const button = form?.querySelector('button');

    expect(form).toBeTruthy();
    expect(input).toBeTruthy();
    expect(button).toBeTruthy();
  });

  it('should emit "playerCreated" event and remove overlay on submit', () => {
    const spy = EventEmitter.getInstance().emit;

    const form = document.querySelector('form')!;
    const input = form.querySelector('input')!;

    input.value = 'Player123';
    form.dispatchEvent(new Event('submit'));

    expect(spy).toHaveBeenCalledWith('playerCreated', 'Player123');
    expect(document.body.classList.contains('no-overflow')).toBe(false);
  });

  test('should not emit "playerCreated" if name invalid', () => {
    const spy = EventEmitter.getInstance().emit;
    const form = document.querySelector('form')!;
    const input = form.querySelector('input')!;

    input.value = 'Ab';
    form.dispatchEvent(new Event('submit'));

    expect(spy).not.toHaveBeenCalled();
    expect(document.body.classList.contains('no-overflow')).toBe(true);
  });
});
