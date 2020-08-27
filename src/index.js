import restify from 'restify'
import corsMiddleware from 'restify-cors-middleware'
import mongoose from 'mongoose'
import 'dotenv/config'

import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";

const server = restify.createServer({
    name: 'rpg_workouts',
    version: '1.0.0'
})

const cors = corsMiddleware({
    origins: ['*'],
    allowHeaders: ['API-Token'],
    exposeHeaders: ['API-Token-Expiry']
})

server.pre(cors.preflight)
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())
server.use(cors.actual)

mongoose.connect('mongodb://localhost/rpg_workouts', {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {

    authRoutes.attachTo(server)
    userRoutes.attachTo(server)

    server.listen(8080, function () {
        console.log('%s listening at %s', server.name, server.url)
    })
})
