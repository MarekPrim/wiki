const feathers = require('@feathersjs/feathers')
const socketio = require('@feathersjs/socketio')
const knex = require('knex')
const knexService = require('feathers-knex')
var morgan = require('morgan')
const dbConfig = require(`./knexfile.js`)
const database = knex(dbConfig.development)

// Create a feathers instance
const app = feathers()

// Configure the Socket.io transport
app.configure(socketio({
    path: '/gallery-socket-io',
}))

// Create a channel that will handle the transportation of all realtime events
app.on('connection', connection => app.channel('everybody').join(connection))

// Publish all realtime events to the `everybody` channel
app.publish(() => app.channel('everybody'))


// Feathers/Knex REST services
app.use('pages', knexService({ Model: database, name: 'pages' }))


// Start the server on port 3030
app.listen(4000, () => console.log('listening on port 4000'))