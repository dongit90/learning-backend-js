const express = require('express')
const app = express()
//init log
const morgan = require('morgan')
//hide server info (node server, java server, ...)
const helmet = require('helmet')
const compression  = require('compression')
const db = require('./dbs/init.mongodb.lv0')

//init middle ware 
app.use(morgan("dev"))
app.use(morgan("helmet"))
app.use(morgan("compression"))

//init db

//init routes
app.get('/', (req, res, next) => {
    return res.status(200).json({
        message: 'Welcom Fantipjs'
    })
});

//handling error

module.exports = app