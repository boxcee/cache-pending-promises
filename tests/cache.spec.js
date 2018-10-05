import cache from '../src/cache';
import expect from 'expect';

describe('cache pending promises', () => {
  it('returns a promise', () => {
    const first = new Promise(resolve => setTimeout(resolve, 500, 'first'));

    const key = 'get';

    const cachedFirst = cache(key, first);

    expect(cachedFirst).toBe(first);
  });

  it('returns the first promise', async () => {
    const first = new Promise(resolve => setTimeout(resolve, 500, 'first'));
    const second = new Promise(resolve => setTimeout(resolve, 500, 'second'));

    const key = 'get';

    const cachedFirst = cache(key, first);
    const cachedSecond = cache(key, second);

    expect(cachedFirst).toBe(first);
    expect(cachedSecond).toBe(first);
  });
});
