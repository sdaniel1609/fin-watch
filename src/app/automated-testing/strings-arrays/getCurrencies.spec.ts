import {getCurrencies} from './getCurrencies';

describe('getCurrencies', () => {
  it('should return the supported currencies from DB', function () {
    const result = getCurrencies();
    expect(result).toContain('USD');
    expect(result).toContain('EUR');
  });
})
