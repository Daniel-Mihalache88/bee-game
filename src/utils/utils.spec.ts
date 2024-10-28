import { Utils } from './utils';

describe('Utils', () => {
  describe('Test getBeeSwarn()', () => {
    it('should return map with 14 entries', () => {
      const swarn = Utils.getBeeSwarn();

      expect(swarn.size).toBe(14);
    });

    it('should assign unique IDs to each entity', () => {
      const swarn = Utils.getBeeSwarn();
      const ids = Array.from(swarn.keys());

      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });
});
