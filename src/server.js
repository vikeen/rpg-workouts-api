import restify from 'restify'
import corsMiddleware from 'restify-cors-middleware'
import mongoose from 'mongoose'
import 'dotenv/config'

import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";

let server = restify.createServer({
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

export default {
    async start() {
        try {
            await mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
            mongoose.connection.on('error', console.error.bind(console, 'connection error:'))

            authRoutes.attachTo(server)
            userRoutes.attachTo(server)

            return new Promise ((resolve, reject) => {
                server.listen(process.env.PORT, resolve)
            })
        } catch (error) {
            console.error(error)
        }
    },
    async stop() {
        await mongoose.disconnect()
        await server.close()
        server = null
    }
}
