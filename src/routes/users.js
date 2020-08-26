import restifyMongoose from "restify-mongoose";
import User from "../models/User";

const users = restifyMongoose(User)

const userRoutes = {
    attachTo: (server) => {
        server.get('/users', users.query())
        server.get('/users/:id', users.detail())
        server.post('/users', users.insert())
        server.patch('/users/:id', users.update())
        // server.del('/users/:id', users.remove())
    }
}

export default userRoutes
