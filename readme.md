# one-time-value

generate and verify ephemeral key-value pairs

[![Build status](https://travis-ci.org/michaelrhodes/one-time-value.svg?branch=master)](https://travis-ci.org/michaelrhodes/one-time-value)

## install
```sh
npm install michaelrhodes/one-time-value#1.0.0
```

## use
```js
var otv = require('one-time-value')

// Basic usage
var value = otv(generator)
var val = value('key')
value.verify('key', val) // true
value.verify('key', val) // false

function generator () {
  return Math.random()
    .toString(32)
    .substr(2)
}

// With TTL (in milliseconds)
var value = otv(generator, 1000)
var val = value('key')

value.expiry('key') // timestamp

setTimeout(function () {
  value.verify('key', val) // false
}, 1500)
```

## obey
[MIT](https://opensource.org/licenses/MIT)
