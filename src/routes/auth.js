import {InternalServerError, BadRequestError} from 'restify-errors'
import User from "../models/User";

const authRoutes = {
    attachTo: (server) => {
        server.post('/auth/register', async (req, res, next) => {
            const user = await new User(req.body)

            try {
                await user.validate()
            } catch (e) {
                return res.send(400, {
                    message: e.message,
                    errors: e.errors
                })
            }

            try {
                await user.save()
                return res.send(user)
            } catch (e) {
                next(new InternalServerError(e));
            }
        })
    }
}

export default authRoutes
