import server from '../src/server'

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

before(async () => {
    await server.start()
})

afterEach(async () => {
    // TODO: maybe find a truncate version?
    await mongoose.connection.db.dropDatabase()
});

after(async () => {
    await server.stop()
})
