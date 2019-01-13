# one-time-value

generate and verify emphemeral key-value pairs

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
var token = value('key')
value.verify('key', token) // true
value.verify('key', token) // false

function generator () {
  return Math.random()
    .toString(32)
    .substr(2)
}

// With TTL (in milliseconds)
var value = otv(generator, 1000)
var token = value('key')

setTimeout(function () {
  value.verify('key', token) // false
}, 1500)
```

## obey
[MIT](https://opensource.org/licenses/MIT)
