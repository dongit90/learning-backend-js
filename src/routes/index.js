'use strict'

const express = require('express')
const router = express.Router()
const accessController = require('../controllers/access.controller')
const { route } = require('./access')
const { apiKey, permission } = require('../auth/checkAuth')

//check apiKey
router.use(apiKey)
//check permissoin
router.use(permission('0000'))
//init routes
router.use('/v1/api', require('./access'))
module.exports = router