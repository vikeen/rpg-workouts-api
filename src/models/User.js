import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    name: {type: String, required: false},
    email: {type: String, required: true},
    password: {type: String, required: true},
}, {
    timestamps: true
})

UserSchema.pre('save', function (next) {
    this.name = `${this.firstName} ${this.lastName}`
    next()
})

const User = mongoose.model('users', UserSchema)



export default User
