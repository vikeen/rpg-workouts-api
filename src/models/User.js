import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
})
const User = mongoose.model('users', UserSchema)

export default User
