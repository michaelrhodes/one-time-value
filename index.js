module.exports = otv

function otv (generator, ttl) {
  var store = {}
  value.verify = verify
  return value

  function value (key) {
    return key != null ? (active(key) ?
      store[key].value :
      generate(key).value) :
      null
  }

  function verify (key, value) {
    return Boolean(active(key) &&
      store[key].value === value &&
      delete store[key])
  }

  function active (key) {
    return key != null && Boolean(ttl ? (
      store[key] &&
      store[key].time != null &&
      store[key].value != null &&
      (Date.now() - store[key].time <= ttl)) :
      (store[key] && store[key].value != null))
  }

  function generate (key) {
    return store[key] = {
      time: Date.now(),
      value: generator()
    }
  }
}
