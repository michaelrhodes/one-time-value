var assert = console.assert.bind(console)
var otv = require('./')

var value, val

// Basic usage
value = otv(generator)
assert(value() === null, 'Undefined key returns null')
assert(value(null) === null, 'Null returns null')
assert(val = value('key'), 'Non-null key returns value')
assert(val === value('key'), 'Value persists')
assert(value.verify('key', val), 'Value can be verified')
assert(val !== value('key'), 'Value changes after verification')
val = value('key')
assert(!value.verify('key', value('_')), 'Incorrect value fails verification')
assert(!value.verify('key'), 'Undefined value fails verification')
assert(val === value('key'), 'Value doesn’t change after verification failure')

// With TTL
value = otv(generator, 100)
val = value('key')

assert(val === value('key'), 'Value still persists')

setTimeout(function () {
  assert(value.verify('key', val), 'Value can be verified before expiry')

  val = value('key')
  setTimeout(function () {
    assert(!value.verify('key', val), 'Value can’t be verified after expiry')
  }, 150)
}, 50)

function generator () {
  return Math.random()
    .toString(32)
    .substr(2)
}
