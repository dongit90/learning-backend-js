'use strict'

const express = require('express')
const router = express.Router()
const accessController = require('../controllers/access.controller')
//init routes
router.use('/v1/api', require('./access'))
module.exports = router