const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

before(async () => {
    await mongoose.connect('mongodb://localhost/rpg_workouts_test', {
        useNewUrlParser: true
    });
})

afterEach(async () => {
    // TODO: maybe find a truncate version?
    await mongoose.connection.db.dropDatabase()
});

after(async () => {
    await mongoose.disconnect()
})
