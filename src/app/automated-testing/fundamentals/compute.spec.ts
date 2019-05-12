import {compute} from './compute';

describe('compute', () => {
  it('should return 0 if input is negative', function () {
    const result = compute(-1);
    expect(result).toBe(0);
  });

  it('should increment by 1 if input is positive', function () {
    const result = compute(1);
    expect(result).toBe(2);
  });
})
