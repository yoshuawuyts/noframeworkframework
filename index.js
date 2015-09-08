const watchifyRequest = require('watchify-request')
const toServer = require('wayfarer-to-server')
const hyperstream = require('hyperstream')
const httpNdjson = require('http-ndjson')
const summary = require('server-summary')
const html = require('simple-html-index')
const browserify = require('browserify')
const match = require('pathname-match')
const wayfarer = require('wayfarer')
const watchify = require('watchify')
const http = require('http')

const router = toServer(wayfarer('404'))
const staticRouter = toServer(wayfarer())

router.on('static', staticRouter)
router.on('404', {
  all: function (req, res) {
    res.statusCode = 404
    res.end()
  }
})

router.on('/', {
  get: function (req, res) {
    const htmls = html({
      title: 'noframeworkframe.work',
      entry: 'static/bundle.js',
      css: 'static/bundle.css'
    })

    const tag = `
      <script src="//use.typekit.net/ohj8vea.js"></script>
      <script>try{Typekit.load({ async: true });}catch(e){}</script>
    `
    const hs = hyperstream({ body: { _appendHtml: tag } })

    htmls.pipe(hs).pipe(res)
  }
})

var b = browserify({
  cache: {},
  packageCache: {},
  entries: [ require.resolve('client-main') ],
  fullPaths: true
})
if (process.env.NODE_ENV === 'development') b = watchify(b)
const handler = watchifyRequest(b)

staticRouter.on('/bundle.js', {
  get: function (req, res) {
    handler(req, res)
  }
})

// create server
const server = http.createServer(function (req, res) {
  httpNdjson(req, res).pipe(process.stdout)
  router(match(req.url), req, res)
})

server.listen(1337, summary(server))
