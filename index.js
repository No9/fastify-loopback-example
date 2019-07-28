const fastify = require('fastify')({ logger: true })
const ServicesApplication = require('./services/dist/application').ServicesApplication
var lbApp = new ServicesApplication({});
lbApp.projectRoot = __dirname + '/services/dist'

lbApp.boot().then(function() {
    // Declare a route
    fastify.use('/api', lbApp.requestHandler)
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
