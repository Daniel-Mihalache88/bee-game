/**
 * @jest-environment jsdom
 */

import { BeeComponent } from './beeComponent';

describe('BeeComponent', () => {
  let component: BeeComponent;
  const initialHealth = 100;
  const id = 1;

  beforeEach(() => {
    component = new BeeComponent(initialHealth, id);
    document.body.appendChild(component.element);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set data-id', () => {
    const beeContainer = component.element;

    expect(beeContainer.getAttribute('data-id')).toBe(id.toString());
    expect(beeContainer.classList.contains('content__item')).toBe(true);
  });

  it('should set image element with src and alt', () => {
    const img = component.element.querySelector('img');

    expect(img!.src).toContain('src/assets/bee_icon.png');
    expect(img!.alt).toBe('bee_icon');
  });

  it('should display initial health correctly', () => {
    const healthText = component.element.querySelector('span');

    expect(healthText!.textContent).toBe(`HP: ${initialHealth}`);
  });

  it('should add damage container', () => {
    const damageContainer = component.element.querySelector('.damage');

    expect(damageContainer!.classList.contains('damage')).toBe(true);
  });
});
