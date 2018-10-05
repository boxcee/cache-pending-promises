import cache from '../src/cache';
import expect from 'expect';

describe('cache pending promises', () => {
  it('returns a promise', () => {
    const key = 'get';

    const first = new Promise(resolve => setTimeout(resolve, 50, 'first'));

    const cachedFirst = cache(key, first);

    expect(cachedFirst).toBe(first);
  });

  it('returns the first promise and the third after resolving the first', async () => {
    const key = 'get';

    const first = new Promise(resolve => setTimeout(resolve, 100, 'first'));
    const second = new Promise(resolve => setTimeout(resolve, 50, 'second'));

    const cachedFirst = cache(key, first);
    const cachedSecond = cache(key, second);

    const firstResult = await cachedFirst;
    const secondResult = await cachedSecond;

    await new Promise(resolve => setTimeout(resolve, 200, 'timeout'));

    const third = new Promise(resolve => setTimeout(resolve, 100, 'third'));

    const cachedThird = cache(key, third);

    const thirdResult = await cachedThird;

    expect(firstResult).toBe('first');
    expect(secondResult).toBe('first');
    expect(thirdResult).toBe('third');
  });

  it('to do', async () => {
    const key = 'get';

    const first = new Promise(resolve => setTimeout(resolve, 100, 'first'));
    const second = new Promise(resolve => setTimeout(resolve, 50, 'second'));

    const cachedFirst = await cache(key, first);
    const cachedSecond = await cache(key, second);

    console.log(cachedFirst);
    console.log(cachedSecond);
  })
});
