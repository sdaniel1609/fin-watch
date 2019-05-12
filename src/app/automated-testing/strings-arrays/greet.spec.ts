import {greet} from './greet';

describe('greet', () => {
  it('should include name in welcome message', function () {
    expect(greet('simon')).toContain('simon');
  });
})
