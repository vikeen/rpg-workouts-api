import server from './server'

server.start().then(() => {
    console.log(`RPG Workouts API server listening on ${process.env.PORT}`)
}).catch(console.error)
