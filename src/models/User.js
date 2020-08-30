import mongoose from "mongoose"
import bcrypt from "bcrypt"
import uniqueValidator from 'mongoose-unique-validator'
import {required} from "./validators";

const UserSchema = new mongoose.Schema({
    username: {type: String, required, unique: true},
    firstName: {type: String, required},
    lastName: {type: String, required},
    name: {type: String, required: false},
    email: {type: String, required, unique: true},
    password: {type: String, required, select: false},
}, {
    timestamps: true
})

UserSchema.plugin(uniqueValidator)

UserSchema.pre('save', function (next) {
    this.name = `${this.firstName} ${this.lastName}`

    if (this.password) {
        this.password = bcrypt.hashSync(this.password, 10)
    }

    next()
})

UserSchema.methods.toJSON = function () {
    const obj = this.toObject()
    delete obj.password
    return obj
}

const User = mongoose.model('users', UserSchema)

export default User
