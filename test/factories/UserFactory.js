import User from "../../src/models/User";

export default {
    create: (data) => {
        return User.create(buildData(data))
    },
    build: (data) => {
        return new User(buildData(data))
    }
}

function buildData(data = {}) {
    return {
        username: "john.rake",
        email: "john@gorillabotlabs.com",
        password: "password",
        ...data
    }
}
