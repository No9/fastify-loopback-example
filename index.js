const fastify = require('fastify')({ logger: true })

const ServicesApplication = require('./services/dist/application').ServicesApplication
var lbApp = new ServicesApplication({});
lbApp.projectRoot = __dirname + '/services/dist'

lbApp.boot().then(function() {
    // fix explorer openapi.json resolution
    // For more details see:
    // https://github.com/strongloop/loopback-next/pull/3133
    // https://github.com/strongloop/loopback-next/issues/2329
    // https://github.com/strongloop/loopback-next/issues/2285
    fastify.use('/api/explorer', function(req, res, next) {
        req.baseUrl = '/api'
        next();
    })
    // Attach the APIs and explorer
    fastify.use('/api', lbApp.requestHandler)
    // Declare a route
    fastify.get('/', (request, reply) => {
        reply.send({ hello: 'world' })
    })

    // Run the server!
    fastify.listen(3000, (err) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
    })
})
