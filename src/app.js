const express = require('express')
const app = express()
//init log
const morgan = require('morgan')
//hide server info (node server, java server, ...)
const helmet = require('helmet')
const compression  = require('compression')
const {countConnect} = require('./helpers/check.connect') 

//init middle ware 
app.use(morgan("dev"))
app.use(morgan("helmet"))
app.use(morgan("compression"))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

//init db
require('./dbs/init.mongodb')
//init routes
app.use('/', require('./routes'))

//handling error
app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    const statusCode = error.status || 500
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        stack: error.stack,
        message: error.message || 'Internal server error'
    })
})
module.exports = app