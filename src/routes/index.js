'use strict'

const express = require('express')
const router = express.Router()
const accessController = require('../controllers/access.controller')
const { apiKey, permission } = require('../auth/checkAuth')

//check apiKey
router.use(apiKey)
//check permissoin
router.use(permission('0000'))
//init routes
router.use('/v1/api', require('./access'))
router.use('/v1/api/product', require('./product'))
router.use('/v1/api/discount', require('./discount'))
router.use('/v1/api/cart', require('./cart'))
router.use('/v1/api/checkout', require('./checkout'))
router.use('/v1/api/inventory', require('./inventory'))

module.exports = router