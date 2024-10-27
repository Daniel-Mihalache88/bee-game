import { Swarn } from './swarn';

describe("test", () => {
  let swarn: Swarn<any>;

  beforeEach(() => {
    swarn = new Swarn(new Map());
  })

  it("should be true", () => {
    expect(swarn).toBeTruthy();
  })
})