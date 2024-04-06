'use strict'

const express = require('express')
const router = express.Router()
const accessController = require('../../controllers/access.controller')
//init routes
router.get('', (req, res, next) => {
    return res.status(200).json({
        message: 'Welcom Fantipjs'
    })
});

router.post('/shop/signup', accessController.signUp)
module.exports = router