var assert = console.assert
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
assert(value.verify('key', value('_')) === false, 'Incorrect value fails verification')
assert(value.verify('key') === false, 'Undefined value fails verification')
assert(val === value('key'), 'Value doesn’t change after verification failure')
assert(value.verify('unknown', val) === false, 'Unknown key fails verification')
assert(value.expiry('key') === null, 'Value has no expiry timestamp')

// With TTL
value = otv(generator, 100)
val = value('key')

assert(val === value('key'), 'Value still persists')
assert(isNaN(new Date(value.expiry('key'))) === false, 'Value has a valid expiry timestamp')

setTimeout(function () {
  assert(value.verify('key', val), 'Value can be verified before expiry')

  val = value('key')
  setTimeout(function () {
    assert(value.verify('key', val) === false, 'Value can’t be verified after expiry')
  }, 150)
}, 50)

function generator () {
  return Math.random()
    .toString(32)
    .substr(2)
}
