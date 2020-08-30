import {InternalServerError} from 'restify-errors'
import bcrypt from 'bcrypt'
import validator from '../middleware/validator'
import User from "../models/User";

const authRoutes = {
    attachTo: (server) => {
        server.post('/auth/register', registerHandler)
        server.post('/auth/login',
            validator({
                username: {required: true},
                password: {required: true}
            }),
            loginHandler)
    }
}

export default authRoutes

const registerHandler = async (req, res, next) => {
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
}

const loginHandler = async (req, res, next) => {
    const {username, password} = req.body

    const sendInvalidLoginAttempt = () => {
        return res.send(400, {message: "Invalid login attempt"})
    }

    const user = await User.findOne({
        username: new RegExp(`^${username}$`, 'i'),
    }).select("+password")

    if (!user) {
        return sendInvalidLoginAttempt()
    }

    const result = await bcrypt.compare(password, user.password)

    if (result) {
        return res.send(user)
    } else {
        return sendInvalidLoginAttempt()
    }
}
