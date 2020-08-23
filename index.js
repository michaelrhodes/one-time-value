module.exports = otv

function otv (generator, ttl) {
  var store = new Map
  value.verify = verify
  value.expiry = expiry
  return value

  function value (key) {
    return key != null ? (active(key) ?
      store.get(key).value :
      generate(key).value) :
      null
  }

  function verify (key, value) {
    return Boolean(active(key) &&
      store.get(key).value === value &&
      store.delete(key))
  }

  function expiry (key) {
    return ttl &&
      active(key) &&
      (store.get(key).time + ttl) ||
      null
  }

  function active (key) {
    return key != null && Boolean(ttl ? (
      store.has(key) &&
      store.get(key).time != null &&
      store.get(key).value != null &&
      (Date.now() - store.get(key).time <= ttl)) :
      (store.has(key) && store.get(key).value != null))
  }

  function generate (key) {
    return store.set(key, {
      time: Date.now(),
      value: generator()
    }).get(key)
  }
}
