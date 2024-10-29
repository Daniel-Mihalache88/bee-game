/**
 * @jest-environment jsdom
 */

import { Form } from './formComponent';

describe('FormComponent', () => {
  let component: Form;

  beforeEach(() => {
    component = new Form();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form with class .new-player-overlay', () => {
    expect(component.element.classList.contains('new-player-overlay')).toBe(true);
  });

  it('should create formHeader with image and span', () => {
    const header = component.element.querySelector('div');

    expect(header?.querySelector('img')?.src).toContain('src/assets/game_intro.png');
    expect(header?.querySelector('span')?.textContent).toBe('The Bee Game');
  });

  it('should append element to form', () => {
    const mockElement = document.createElement('div');
    component.appendChild(mockElement);

    expect(component.element.contains(mockElement)).toBe(true);
  });
});
