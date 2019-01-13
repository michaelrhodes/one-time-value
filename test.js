var otv = require('./')
var value, val

// Basic usage
value = otv(generator)
console.assert(value() === null, 'Undefined key returns null')
console.assert(value(null) === null, 'Null returns null')
console.assert(val = value('key'), 'Non-null key returns value')
console.assert(val === value('key'), 'Value persists')
console.assert(value.verify('key', val), 'Value can be verified')
console.assert(val !== value('key'), 'Value changes after verification')
val = value('key')
console.assert(!value.verify('key', value('_')), 'Incorrect value fails verification')
console.assert(!value.verify('key'), 'Undefined value fails verification')
console.assert(val === value('key'), 'Value doesn’t change after verification failure')

// With TTL
value = otv(generator, 100)
val = value('key')

console.assert(val === value('key'), 'Value still persists')

setTimeout(function () {
  console.assert(value.verify('key', val), 'Value can be verified before expiry')

  val = value('key')
  setTimeout(function () {
    console.assert(!value.verify('key', val), 'Value can’t be verified after expiry')
    console.assert(true, 'EOT')
  }, 150)
}, 50)

function generator () {
  return Math.random()
    .toString(32)
    .substr(2)
}
