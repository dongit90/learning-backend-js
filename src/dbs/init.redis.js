'use strict'

const {createClient } = require('redis')
const client = createClient({
    url: process.env.REDIS_URI
})

client.ping(function (err, result){
    console.log(result)
})

client.on('connect', () =>{
    console.log('Redis connect')
})

client.on('error', (error) =>{
    console.error(error)
})

module.exports = client