const feathers = require('@feathersjs/feathers')
const express = require('@feathersjs/express')
const knex = require('knex')
const knexService = require('feathers-knex')
const socketio = require('@feathersjs/socketio')
const cors = require('cors')
const dbConfig = require('./knexfile.js')
const database = knex(dbConfig.development)


// Create a feathers instance.
const app = express(feathers())
    // Enable REST transport

// Add cors middleware

app.configure(socketio({
    path: '/gallery-socket-io',
}))

app.configure(express.rest())

// JSON body parser middleware
app.use(express.json())
app.use(cors())
    // Feathers/Knex REST services
app.use('/api/pages', knexService({ Model: database, name: 'pages' }))

// Start the server on port 3030
app.listen(3030, () => console.log('listening on port 3030'))