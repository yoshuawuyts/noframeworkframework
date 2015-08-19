# server

Node is different from other languages because it ships with a native HTTP
server in its standard library. This makes it great for creating interfaces
with other systems, or writing scripts that do one thing well.

- [Creating a server](#creating-a-server)
- [Req Res](#req-res)
- [Listen](#listen)
- [browserify-server](#browserify-server)

## Creating a server
Creating a server in Node goes as follows:

```js
// require the 'http' module from stdlib
const http = require('http')

// create server that calls a function (callback)
// on each request
const server = http.createServer(function (req, res) {
  res.write('hello world') // write to response object
  res.end()                // close the response and send it off
})

// request server listen on port 1337
// and log something once it's
// started listening
server.listen(1337, function () {
  console.log('port: 1337')
})
```
In this case we create a server, write 'hello world' to the response body, and
close the response to send it off. In ES2015 we could do it in 3 lines:
```js
import http from 'http'
const server = http.createServer((req, res) => res.end('hello world'))
server.listen(1337)
```

Because servers both EventEmitters that pass around streams, there are other
ways of writing servers. Though these are less common (and by no means
necessary to learn), they might be nice to have seen at least once.

__EventEmitter style__
```js
const http = require('http')

// listen to server events
const server = http.createServer()
server.on('request', function (req, res) {
  res.write('hello world')
  res.end()
})
server.listen(1337)
```

__Stream style__
```js
const http = require('http')
const fs = require('fs')

// pipe a file to the response object
const server = http.createServer(function (req, res) {
  fs.createReadStream('./my-file').pipe(res)
})
server.listen(1337)
```

## Req, Res
Node's server callback has 2 arguments:
- __req__: `Class:http.IncomingMessage`, the message received from the client.
- __res__: `Class:http.ServerResponse`, the response that will be sent back.

Both arguments are steams and have some properties on them. Probably the most
important ones are:

### req
- __.url__
- __.on('data', fn(value))__: pipe the request body as it comes in.

### res
- __.statusCode(code)__: set the http statusCode
- __.statusMessage(message)__: set the http status message
- __.writeHeader(header, value)__: set a header
- __.write(data)__: write a string or buffer to the response
- __.end(data)__: send the response off. All operations on `res` after this
  will throw an error.

## Listen
Once a server is created, all it needs to do is listen to a port. To do that
there's the `.listen()` method which takes two arguments:
- __port__: a valid HTTP port. If value is null or undefined, a random open
  port will be selected.
- __callback__: an empty callback that will be called when the server starts
  listening. The value of `this` points to the server.

## browserify-server
```js
const browserify = require('browserify')
const http = require('http')

const server = http.createServer(function (req, res) {
  const b = browserify('./index.js')
  b.bundle().pipe(res)
})
server.listen(1337)
```
