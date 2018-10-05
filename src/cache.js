const cache = {};

/**
 * Returns the status of a promise.
 *  1 - pending
 *  2 - fulfilled
 *  3 - rejected
 *
 * @param promise
 * @returns {Promise<number>}
 */
const status = (promise) => {
  const immediate = Promise.resolve(1);
  return Promise.race([promise, immediate]).then(v => (v === 1 ? 1 : 2), () => 3);
};

export default (key, promise) => {
  const p = cache[key];

  if (!p) {
    cache[key] = promise;
    return promise;
  }

  return status(p).then(v => {
    if (v === 1) {
      return p;
    }
    cache[key] = promise;
    return promise;
  });
};
