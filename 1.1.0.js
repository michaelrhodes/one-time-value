!function(n){"module"in this?module.exports=n():otv=n()}(function(){return function(n,u){var e={};return l.verify=function(n,u){return Boolean(t(n)&&e[n].value===u&&delete e[n])},l.expiry=function(n){return u&&t(n)&&e[n].time+u||null},l;function l(u){return null!=u?t(u)?e[u].value:function(u){return e[u]={time:Date.now(),value:n()}}(u).value:null}function t(n){return null!=n&&Boolean(u?e[n]&&null!=e[n].time&&null!=e[n].value&&Date.now()-e[n].time<=u:e[n]&&null!=e[n].value)}}});