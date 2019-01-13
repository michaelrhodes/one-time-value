var spy = require('console-spy')()
var exitCode = 0

spy.on('assert', function (ok, message) {
  if (!ok) exitCode = 1
  if (ok && message === 'EOT') process.exit(exitCode)
})

require('./test')
