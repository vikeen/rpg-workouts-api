import mongoose from "mongoose"
import uniqueValidator from 'mongoose-unique-validator'

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    name: {type: String, required: false},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
}, {
    timestamps: true
})

UserSchema.plugin(uniqueValidator)

UserSchema.pre('save', function (next) {
    this.name = `${this.firstName} ${this.lastName}`
    next()
})

const User = mongoose.model('users', UserSchema)

export default User
